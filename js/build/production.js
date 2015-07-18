document.getElementById('btnToggleMobileNav').addEventListener('click', function () {
	document.getElementById('primary').classList.toggle('isVisible');
	console.log('fired');
});
(function(){
'use strict';

	var jnav = {	
			
		lastFrameTime: undefined,
		topPadding: undefined,

		documentHeight: function(){
			return Math.max(
				document.body.offsetHeight, 
				document.body.scrollHeight, 
				document.documentElement.offsetHeight, 
				document.documentElement.scrollHeight
			);
		},

		scrollTop: function(){
			return document.documentElement.scrollTop || document.body.scrollTop;
		},

		setNav: function(headings, navItems) {
			var currentSection = 0,
				scrollTop = jnav.scrollTop();			

			for (var i = 0; i < headings.length; i++) {
				if (scrollTop > (headings[i].offsetTop - (window.innerHeight / 1.5))) {
					currentSection = i;				
				}
			}		
				
			navItems.forEach(function(el, index, array){			
				array[index].classList.remove('active');
			});
			
			navItems[currentSection].classList.add('active');		
		},
		
		animateScroll: function(el, lastFrame) {			
			var scrollTop = jnav.scrollTop(),
				documentHeight = jnav.documentHeight(),
				targetLocation = el.offsetTop - jnav.topPadding,				
				doAnimate = false,
				newLocation = scrollTop,					
				speed = (+new Date() - lastFrame) * 8;
					
			if(scrollTop >= targetLocation){			
				//we are going up									
				newLocation = Math.max(scrollTop - speed, targetLocation);						
				doAnimate = (scrollTop > targetLocation) && (scrollTop > 0);
			}else{			
				//we are going down			
				newLocation = Math.min(scrollTop + speed, targetLocation);		
				doAnimate = (scrollTop < targetLocation - speed) && (scrollTop < documentHeight - window.innerHeight);			
			}
			
			window.scrollTo(0, newLocation);

			if(doAnimate){				
				lastFrame = +new Date();
				window.requestAnimationFrame(function(){jnav.animateScroll(el, lastFrame)});
			}
		},
		
		scrollToSection: function() {
			var e = Array.prototype.slice.call(arguments)[0],		
				target = e.target.href.split('#').pop();			
							
			e.preventDefault();				
			jnav.animateScroll(document.getElementById(target), +new Date());		
		},
		
		init: function(targetArea, tagName){		
			var headings = document.getElementById(targetArea).getElementsByTagName(tagName),
				navItems = [],
				navContainer = document.createElement('div');

			navContainer.id = 'page-nav';			

			jnav.topPadding = parseInt(window.getComputedStyle(document.getElementById(targetArea), null).getPropertyValue('padding-top'));

			Array.prototype.slice.call(headings).forEach(function(el,i,array){
				var a = document.createElement('a');
				a.innerHTML = array[i].id;
				a.href = "#" + array[i].id;
				navItems.push(a);
				navContainer.appendChild(a);
			});		
					
			document.getElementById('heading').appendChild(navContainer);	
			document.getElementById('page-nav').addEventListener('click', jnav.scrollToSection);
			window.addEventListener('scroll', function(){jnav.setNav(headings,navItems)});		
		}
	 }

	jnav.init('content', 'h2');
}());