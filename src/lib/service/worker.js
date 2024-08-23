self.onmessage = (e) => {
  const particles = generateParticles(e.data.size) // particle generation log
  self.postMessage({ particles })
}

function generateParticles(size) {}
