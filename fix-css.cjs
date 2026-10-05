const fs = require('fs');
const cssPath = 'src/index.css';
let lines = fs.readFileSync(cssPath, 'utf8').split('\n');

// Take up to line 1199
let newLines = lines.slice(0, 1199);
newLines.push('}');

const cleanCSS = `
/* Premium Product Hero Styles */
.premium-product-hero {
    position: relative;
    width: 100%;
    padding: 80px 5% 60px;
    background: linear-gradient(135deg, #0b0f19 0%, #1a233a 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    color: #fff;
    min-height: 70vh;
}
.hero-particles {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: 
        radial-gradient(circle at 15% 50%, rgba(254, 166, 3, 0.15) 0%, transparent 40%),
        radial-gradient(circle at 85% 30%, rgba(0, 168, 255, 0.15) 0%, transparent 40%);
    z-index: 1;
    animation: pulseGlow 8s ease-in-out infinite alternate;
}
@keyframes pulseGlow {
    0% { opacity: 0.7; }
    100% { opacity: 1; }
}
.premium-hero-container {
    position: relative;
    z-index: 2;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    max-width: 1300px;
    width: 100%;
    gap: 40px;
}
.premium-hero-text {
    flex: 1 1 450px;
}
.premium-badge {
    display: inline-block;
    padding: 8px 18px;
    background: rgba(254, 166, 3, 0.15);
    color: #FEA603;
    border-radius: 30px;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 25px;
    border: 1px solid rgba(254, 166, 3, 0.4);
    box-shadow: 0 0 15px rgba(254, 166, 3, 0.2);
}
.premium-hero-title {
    font-size: 4rem;
    font-weight: 900;
    line-height: 1.1;
    margin-bottom: 25px;
    background: linear-gradient(to right, #ffffff, #cbd5e1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
.premium-hero-subtitle {
    font-size: 1.2rem;
    color: #94a3b8;
    line-height: 1.7;
    margin-bottom: 35px;
    max-width: 550px;
}
.premium-hero-img-wrapper {
    flex: 1 1 400px;
    display: flex;
    justify-content: center;
    position: relative;
    perspective: 1000px;
}
.premium-hero-img {
    width: 100%;
    max-width: 550px;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 30px 40px rgba(0,0,0,0.6));
    animation: floatImg 5s ease-in-out infinite;
    z-index: 3;
}
.premium-hero-img-wrapper::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    background: radial-gradient(circle, rgba(254,166,3,0.35) 0%, transparent 60%);
    z-index: 1;
    filter: blur(30px);
    animation: glowPulse 4s ease-in-out infinite alternate;
}
@keyframes glowPulse {
    0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
    100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}
@keyframes floatImg {
    0% { transform: translateY(0px) rotateX(0deg) scale(1); }
    50% { transform: translateY(-20px) rotateX(5deg) scale(1.03); filter: drop-shadow(0 45px 50px rgba(0,0,0,0.4)); }
    100% { transform: translateY(0px) rotateX(0deg) scale(1); }
}

/* Mobile Responsiveness for Premium Hero */
@media (max-width: 900px) {
    .premium-product-hero {
        min-height: auto;
        padding: 100px 5% 60px;
    }
    .premium-hero-title {
        font-size: 3rem;
    }
}
@media (max-width: 768px) {
    .premium-product-hero {
        padding: 80px 20px 40px;
    }
    .premium-hero-container {
        flex-direction: column-reverse;
        text-align: center;
        gap: 40px;
    }
    .premium-hero-text {
        flex: 1 1 100%;
    }
    .premium-hero-title {
        font-size: 2.4rem;
        background: linear-gradient(to right, #ffffff, #cbd5e1);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .premium-hero-subtitle {
        margin: 0 auto 30px;
        font-size: 1.1rem;
    }
    .premium-hero-img-wrapper {
        flex: 1 1 100%;
        width: 100%;
        margin-bottom: 20px;
    }
    .premium-hero-img {
        max-width: 90%;
        width: 100%;
        filter: drop-shadow(0 15px 25px rgba(0,0,0,0.5));
    }
    .premium-hero-img-wrapper::after {
        width: 100%;
        height: 100%;
        filter: blur(20px);
    }
}
@media (max-width: 480px) {
    .premium-hero-title {
        font-size: 2rem;
    }
    .premium-hero-img {
        max-width: 100%;
    }
}
`;
  
fs.writeFileSync(cssPath, newLines.join('\n') + '\n' + cleanCSS, 'utf8');
console.log("Replaced CSS correctly.");
