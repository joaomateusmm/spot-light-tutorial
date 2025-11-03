const cards = document.querySelectorAll(
  ".spotlight-card, .spotlight-card-2, .spotlight-card-3"
);

cards.forEach((card) => {
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  const followSpeed = 0.08;
  let animationFrameId = null;

  function animateSpotLight() {
    let diffX = targetX - currentX;
    let diffY = targetY - currentY;
    currentX += diffX * followSpeed;
    currentY += diffY * followSpeed;

    card.style.setProperty("--x", `${currentX}px`);
    card.style.setProperty("--y", `${currentY}px`);

    animationFrameId = requestAnimationFrame(animateSpotLight);
  }

  card.addEventListener("mouseenter", (e) => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }

    const rect = card.getBoundingClientRect();
    targetX = e.clientX - rect.left;
    targetY = e.clientY - rect.top;
    currentX = targetX;
    currentY = targetY;

    animationFrameId = requestAnimationFrame(animateSpotLight);
  });

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    targetX = e.clientX - rect.left;
    targetY = e.clientY - rect.top;
  });

  card.addEventListener("mouseleave", () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  });
});
