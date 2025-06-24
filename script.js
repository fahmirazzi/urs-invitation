document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger, SplitText);

  // 1. Get the full URL's query string (everything after '?')
  const queryString = window.location.search;

  // 2. Create a special object to easily handle the URL parameters
  const urlParams = new URLSearchParams(queryString);

  // 3. Get the value of the specific parameter named 'guest'
  // For a URL like "?guest=1234", this will be "1234"
  const guestIdFromUrl = urlParams.get("guest");
  const guestNameElement = document.getElementById("guest-name-placeholder");

  if (guestIdFromUrl) {
    console.log("Found Guest ID in URL:", guestIdFromUrl);

    const foundGuest = guests.find((guest) => guest.id === guestIdFromUrl);

    if (foundGuest) {
      guestNameElement.textContent = foundGuest.name;
    }
  }

  // ================================================================================

  const eventDetails = {
    // Use 'YYYY-MM-DDTHH:MM:SS' format for your local time
    startTime: new Date("2025-07-13T07:30:00"),
    endTime: new Date("2025-07-13T14:00:00"),
    title: "Walimatul 'Urs Fahmi & Fidia",
    description:
      "Bismillah, Mohon berkenan untuk mengikuti Adab Walimah 'Urs. ",
    location:
      "Masjid Asmaul Husna Gading Serpong, Kelapa Dua, Tangerang, Banten",
  };

  // =========================================================================
  // SECTION 2: MUSIC PLAYER
  // =========================================================================
  const music = document.getElementById("background-music");
  const toggleBtn = document.getElementById("music-toggle-btn");
  const guestBtn = document.getElementById("guess-button");
  const playIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>`;
  const pauseIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>`;
  music.volume = 0.3; // Set initial volume
  const tl_splash = gsap.timeline({
    defaults: {
      ease: "power2.out",
      duration: 1,
      stagger: {
        each: 0.2,
      },
      onComplete: () => {
        music.play();
        // toggleBtn.innerHTML = pauseIcon;
      },
    },
  });

  //=================================================================//
  //BUTTON SPLASH SCREEN
  //================================================================
  guestBtn.addEventListener("click", () => {
    guestBtn.disabled = true;
    tl_splash
      .to(".curtain", {
        y: "100%",
      })
      .to(".splash-screen", {
        display: "none",
        duration: 1,
      })
      .to(".curtain", {
        y: "0%",
      })
      .fromTo(
        "#doodle-oval",
        { drawSVG: "0%" },
        {
          drawSVG: "100%",
          duration: 1.5,
          ease: "power1.inOut",
        }
      );
  });

  //=========================================================================================
  // SCROLL TRIGGER
  //=========================================================================================

  function createScrollTrigger(element, timeline) {
    ScrollTrigger.create({
      trigger: element,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      },
    });

    ScrollTrigger.create({
      trigger: element,
      start: "top 80%",
      // end: "bottom 20%",
      // markers: true,
      onEnter: () => timeline.play(),
    });
  }

  document.querySelectorAll(".animate-3d").forEach((element) => {
    let tl = gsap.timeline({ paused: true });

    tl.from(element, {
      scale: 0.2,
      opacity: 0,
      y: 100,
      duration: 1,
      ease: "power4.inOut",
    }).to(element, {
      y: 10,
      yoyo: true,
      repeat: -1,
      duration: 1.5,
      ease: "none",
    });
    createScrollTrigger(element, tl);
  });

  document.querySelectorAll(".draw-this").forEach((element) => {
    let tl = gsap.timeline({ paused: true });

    tl.fromTo(
      element,
      { drawSVG: "0%" },
      {
        drawSVG: "100%",
        duration: 2,
        ease: "power2.inOut",
        stagger: 0.2,
      }
    );
    createScrollTrigger(element, tl);
  });

  const venue_img = document.querySelectorAll(".animate-venue");
  // const venue_wrapper = document.querySelector(".image-grid-wrapper");

  let venue_tl = gsap.timeline({
    paused: true,
    scrollTrigger: {
      trigger: ".images-grid-wrapper",
      // markers: true,
      start: "top 60%",
    },
  });

  venue_tl.from(venue_img, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.inOut",
    stagger: { each: 0.2 },
  });

  // createScrollTrigger(venue_wrapper, venue_tl);

  toggleBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      toggleBtn.innerHTML = pauseIcon;
    } else {
      music.pause();
      toggleBtn.innerHTML = playIcon;
    }
  });

  // =========================================================================
  // SECTION 3: ADD TO CALENDAR LINKS
  // =========================================================================
  function toUTCString(date) {
    return date.toISOString().replace(/-|:|\.\d+/g, "");
  }

  function createGoogleLink(details) {
    const baseUrl = "https://www.google.com/calendar/render?action=TEMPLATE";
    const params = new URLSearchParams({
      text: details.title,
      dates: `${toUTCString(details.startTime)}/${toUTCString(
        details.endTime
      )}`,
      details: details.description,
      location: details.location,
    });
    return `${baseUrl}&${params.toString()}`;
  }

  document.getElementById("google-calendar-link").href =
    createGoogleLink(eventDetails);

  const appleLink = document.getElementById("apple-calendar-link");
  appleLink.addEventListener("click", (event) => {
    event.preventDefault();
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${
      eventDetails.title
    }\nDTSTART:${toUTCString(eventDetails.startTime)}\nDTEND:${toUTCString(
      eventDetails.endTime
    )}\nLOCATION:${eventDetails.location}\nDESCRIPTION:${
      eventDetails.description
    }\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const tempLink = document.createElement("a");
    tempLink.href = URL.createObjectURL(blob);
    tempLink.setAttribute("download", "wedding-invitation.ics");
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  });

  // =========================================================================
  // SECTION 4: GSAP ANIMATIONS
  // =========================================================================

  // --- Initial Page Load Animations ---
  // gsap.from(".main-title", {
  //   duration: 1,
  //   y: -50,
  //   opacity: 0,
  //   ease: "power2.out",
  // });
  // gsap.from(".tagline", {
  //   duration: 1,
  //   y: -30,
  //   opacity: 0,
  //   ease: "power2.out",
  //   delay: 0.3,
  // });
  // gsap.from(".calendar-links", { duration: 1, opacity: 0, delay: 0.6 });

  // // --- Scroll-Triggered Animations ---
  // gsap.from(".story-heading, .story-text", {
  //   scrollTrigger: {
  //     trigger: ".details",
  //     start: "top 80%",
  //     toggleActions: "play none none none",
  //     markers: true, // REMOVE FOR PRODUCTION
  //   },
  //   duration: 1.5,
  //   y: 100,
  //   opacity: 0,
  //   stagger: 0.3,
  //   ease: "power3.out",
  // });

  // gsap.from("#heart-path", {
  //   scrollTrigger: {
  //     trigger: "#heart-svg",
  //     start: "top center",
  //     end: "bottom center",
  //     scrub: 1,
  //     markers: true, // REMOVE FOR PRODUCTION
  //   },
  //   drawSVG: "0%",
  //   ease: "none",
  // });
});
