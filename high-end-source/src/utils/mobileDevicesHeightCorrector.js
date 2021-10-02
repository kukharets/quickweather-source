export const mobileDevicesHeightCorrector = (withListenerInit) => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  if (withListenerInit) {
    let lastScrollY, scheduledAnimationFrame;

    function readAndUpdatePage(){
      scheduledAnimationFrame = false;
    }
    function onScroll () {
      lastScrollY = window.scrollY;
      if (scheduledAnimationFrame)
        return;
      scheduledAnimationFrame = true;
      requestAnimationFrame(readAndUpdatePage);
    }

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', mobileDevicesHeightCorrector);
  }
};
