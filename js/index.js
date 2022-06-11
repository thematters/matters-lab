var index = function () {
	var slider, slide;
	var menuDisplay = (boolean)=>{
		let $y, $menu, $close
		if(boolean){
			$y = 0
			$menu = 'none'
			$close = 'inline-flex'
		} else {
			$y = -100
			$menu = 'inline-flex'
			$close = 'none'
		}
		gsap.to(menu, {duration: .3, yPercent: $y, autoAlpha: 1})
		gsap.set('#nav .menu', {display: $menu})
		gsap.set('#nav .close', {display: $close})
	}
	var setSwiper = () => {
		new Swiper(".swiper", {
			slidesPerView: "auto",
			spaceBetween: 16
		});
	}
	var setTips = () => {
		const tl = gsap.timeline({repeat: -1})
		tl.from('.tips .icon', {duration: 1, yPercent: -100, ease: 'power3.out'})
		  .to('.tips .icon', {duration: 1, yPercent: 100, ease: 'power3.in'})
	}
	var setTrigger = () => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: ".who_we_empower",
				start: "top top",
				end: "+=300%",
				scrub: true,
				pin: true
			}
		});
		tl.to('.who_we_empower .creators', {duration: .5, autoAlpha: 0}, 0)
		  .to('.orbit-5 .planets', {duration: 1, rotation: 111}, 0)
		  .set('.orbit-5 .planet-1', {className:"-=planet planet-1"}, 0)
		  .from('.who_we_empower .developers', {duration: 1, autoAlpha: 0}, .5)
		  .set('.orbit-5 .planet-2', {className:"-=planet planet-2 active"}, .5)
		  .to('.who_we_empower .developers', {duration: .5, autoAlpha: 0}, 1.5)
		  .to('.orbit-5 .planets', {duration: 1, rotation: 250}, 1.5)
		  .set('.orbit-5 .planet-2', {className:"-=planet planet-2"}, 1.5)
		  .from('.who_we_empower .investors', {duration: 1, autoAlpha: 0}, 2)
		  .set('.orbit-5 .planet-3', {className:"-=planet planet-3 active"}, 2)
		gsap.to('.orbit-3 .planets', {duration: 180, repeat: -1, rotation: 360, ease: "none"})
		gsap.to('.orbit-4 .planets', {duration: 120, repeat: -1, rotation: 360, ease: "none"})
	}
	var setSlider = () => {
		slider = gsap.timeline({
			repeat: -1,
			repeatDelay: 5
		})
		gsap.to('.orbit-3 .planets', {duration: 180, repeat: -1, rotation: 360, ease: "none"})
		gsap.to('.orbit-4 .planets', {duration: 120, repeat: -1, rotation: 360, ease: "none"})
		gsap.set('.who_we_empower .slide', {autoAlpha: 0})

		slider.add(()=>{ setSlide('1') }, 0)
					.add(()=>{ setSlide('2') }, 5)
					.add(()=>{ setSlide('3') }, 10)
	}
	var setSlide = (val) => {
		let $rotation
		switch (val) {
			case '1':
				$rotation = 0
				break;
			case '2':
				$rotation = 111
				break;
			case '3':
				$rotation = 250
				break;
		}
		slide = gsap.timeline({
			paused: true
		})
		slide.add(()=>{
				const $planet = document.querySelectorAll('.planet');
				const $nav = document.querySelectorAll('.nav');
				for (const item of $planet) {
					item.classList.remove('active');
				}
				for (const item of $nav) {
					item.classList.remove('active');
				}
			})
			.add(()=>{
				document.querySelector('.nav-'+val).classList.add("active")
			})
		  .to('.who_we_empower .slide', {duration: .5, autoAlpha: 0})
			.to('.orbit-5 .planets', {duration: 1, rotation: $rotation})
			.add(()=>{
				document.querySelector('.planet-'+val).classList.add("active")
			}, 1.5)
			.to('.who_we_empower .slide-'+val, {duration: .5, autoAlpha: 1}, 1.5)
		slide.play()
	}
	var setVideo = () => {
		if(window.innerWidth >= 768){
			document.querySelector(".intro video").src = "video/intro-video.mp4";
			document.querySelector(".our_vision_and_mission video").src = "video/ovam-video.mp4";
		}
	}
	var toFollowUs = () => {
		document.querySelector('.follow_us').scrollIntoView({ behavior: 'smooth', block: 'center' })
	}
	var init = () => {
		gsap.set('#nav .close', {display: 'none'})
		gsap.set(menu, {autoAlpha: 0, yPercent: -100})
		// setTrigger()
		setSlider()
		setSwiper()
		setTips()
		setVideo()
	};
	return {
		init: () => {
			init()
		},
		menu: (boolean)=>{
			menuDisplay(boolean)
		},
		goto: () => {
			toFollowUs()
		},
		slide: (val) => {
			slider.pause()
			slide.pause()
			setSlide(val)
		}
	};
}();