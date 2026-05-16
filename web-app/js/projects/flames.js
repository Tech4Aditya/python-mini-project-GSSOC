function getFlamesHTML() {
    return `
        <div class="project-content">
            <h2>💖 FLAMES Game</h2>
            <p class="project-desc">Discover your <strong>relationship status</strong> and calculate your <strong>Compatibility, Rivalry, </strong> or <strong>Nuisance</strong> factor!</p>
            <div class="flames-container">
                <div class="flames-legend">
                    <div class="legend-item">F - Friends</div>
                    <div class="legend-item">L - Love</div>
                    <div class="legend-item">A - Affection</div>
                    <div class="legend-item">M - Marriage</div>
                    <div class="legend-item">E - Enemies</div>
                    <div class="legend-item">S - Siblings</div>
                </div>
                
                <div class="names-input">
                    <input type="text" id="name1" placeholder="Enter first name" maxlength="20">
                    <div class="heart-icon">💕</div>
                    <input type="text" id="name2" placeholder="Enter second name" maxlength="20">
                </div>
                
                <button class="btn-calculate" id="calculateFlames">💖 Calculate</button>
                
                <div class="flames-result" id="flamesResult"></div>
            </div>
        </div>
        
        <style>
            .flames-container {
                padding: 2rem;
                max-width: 700px;
                margin: 0 auto;
                text-align: center;
            }
            
            .flames-legend {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 1rem;
                margin-bottom: 2rem;
            }
            
            .legend-item {
                background: var(--surface-color);
                padding: 0.75rem;
                border-radius: 10px;
                border: 2px solid var(--border-color);
                font-weight: 600;
            }
            
            .names-input {
                display: flex;
                gap: 1rem;
                align-items: center;
                justify-content: center;
                margin-bottom: 2rem;
                flex-wrap: wrap;
            }
            
            .names-input input {
                flex: 1;
                min-width: 200px;
                max-width: 250px;
                padding: 1rem;
                font-size: 1.1rem;
                border: 2px solid var(--border-color);
                border-radius: 10px;
                background: var(--bg-color);
                color: var(--text-color);
                text-align: center;
            }
            
            .heart-icon {
                font-size: 2rem;
                animation: heartbeat 1.5s infinite;
            }
            
            .btn-calculate {
                background: linear-gradient(135deg, #ec4899, #f43f5e);
                color: white;
                border: none;
                padding: 1rem 3rem;
                border-radius: 50px;
                font-size: 1.2rem;
                cursor: pointer;
                transition: var(--transition);
            }
            
            .btn-calculate:hover {
                transform: scale(1.05);
                box-shadow: 0 5px 20px rgba(236, 72, 153, 0.4);
            }
            
            .flames-result {
                margin-top: 3rem;
                min-height: 200px;
            }
            
            .result-card {
                background: linear-gradient(135deg, #ec4899, #f43f5e);
                color: white;
                padding: 3rem;
                border-radius: 20px;
                animation: zoomIn 0.5s ease;
            }
            
            .result-names {
                font-size: 1.5rem;
                margin-bottom: 1rem;
                font-weight: 600;
            }
            
            .result-relationship {
                font-size: 3rem;
                margin: 2rem 0;
                font-weight: bold;
                text-shadow: 2px 2px 10px rgba(0,0,0,0.3);
            }
            
            .result-emoji {
                font-size: 4rem;
                margin-bottom: 1rem;
                animation: bounce 1s infinite;
            }
            
            .result-details {
                margin-top: 2rem;
                padding-top: 2rem;
                border-top: 2px solid rgba(255,255,255,0.3);
                font-size: 1.1rem;
            }
            
            @keyframes heartbeat {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.2); }
            }
            
            @keyframes zoomIn {
                from {
                    opacity: 0;
                    transform: scale(0.5);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
        </style>
    `;
}

function initFlames() {
    const calculateBtn = document.getElementById('calculateFlames');
    const name1Input = document.getElementById('name1');
    const name2Input = document.getElementById('name2');
    const resultDiv = document.getElementById('flamesResult');

    if (!calculateBtn || !name1Input || !name2Input || !resultDiv) return;

    const relationshipData = {
        F: { rel: 'Friends', emoji: '🤝', metric: 'Bond Strength', vibe: 'A bond that never breaks!' },
        L: { rel: 'Love', emoji: '❤️', metric: 'Compatibility Score', vibe: 'Pure romantic chemistry!' },
        A: { rel: 'Affection', emoji: '😊', metric: 'Crush Intensity', vibe: 'Someone\'s blushing!' },
        M: { rel: 'Marriage', emoji: '💍', metric: 'Marital Bliss', vibe: 'Start picking out the rings!' },
        E: { rel: 'Enemies', emoji: '😈', metric: 'Rivalry Quotient', vibe: 'Keep your distance!' },
        S: { rel: 'Siblings', emoji: '🏠', metric: 'Nuisance Factor', vibe: 'Stop touching my stuff!' }
    };

    function calculateFlames() {
        const name1Raw = name1Input.value.trim();
        const name2Raw = name2Input.value.trim();

        if (!name1Raw || !name2Raw) {
            resultDiv.innerHTML = '<p style="color: var(--error-color, #ff4d4d);">⚠️ Please enter both names!</p>';
            return;
        }

        const a = name1Raw.toLowerCase().replace(/\s+/g, '');
        const b = name2Raw.toLowerCase().replace(/\s+/g, '');
        const listA = a.split('');
        const listB = b.split('');

        for (let i = listA.length - 1; i >= 0; i--) {
            const ch = listA[i];
            const matchIndex = listB.indexOf(ch);
            if (matchIndex !== -1) {
                listA.splice(i, 1);
                listB.splice(matchIndex, 1);
            }
        }

        const count = listA.length + listB.length;
        const totalLen = a.length + b.length;
        const score = totalLen > 0 ? 30 + Math.round(((totalLen - count) / totalLen) * 70) : 0;

        const flames = ['F', 'L', 'A', 'M', 'E', 'S'];
        let index = 0;
        while (flames.length > 1) {
            index = (index + count - 1) % flames.length;
            flames.splice(index, 1);
        }

        const final = relationshipData[flames[0]];
        const shareText = `🔥 FLAMES Report: ${name1Raw} + ${name2Raw} = ${final.rel} ${final.emoji}\n${final.metric}: ${score}%\nVibe: ${final.vibe}`;

        resultDiv.innerHTML = `
            <div class="result-card" style="text-align: center; animation: fadeIn 0.5s ease-out;">
                <div class="result-emoji" style="font-size: 3rem; margin-bottom: 10px;">${final.emoji}</div>
                <div class="result-names" style="font-weight: bold; letter-spacing: 1px; margin-bottom: 5px;">${name1Raw.toUpperCase()} & ${name2Raw.toUpperCase()}</div>
                <div class="result-relationship" style="font-size: 1.5rem; color: var(--accent-color, #a29bfe); margin-bottom: 15px;">${final.rel}</div>
                <div class="result-details" style="background: rgba(255,255,255,0.1); padding: 10px; border-radius: 8px; margin-bottom: 15px;">
                    <div style="font-weight: bold;">${final.metric}: ${score}%</div>
                    <div style="font-size: 0.85rem; font-style: italic; opacity: 0.9; margin-top: 5px;">"${final.vibe}"</div>
                </div>
                <button class="copy-btn" data-share="${shareText}" onclick="navigator.clipboard?.writeText(this.getAttribute('data-share'))" style="background: var(--accent-color, #6c5ce7); color: white; border: none; padding: 8px 15px; border-radius: 20px; cursor: pointer; font-size: 0.9rem; transition: all 0.3s; margin-top: 10px;">📋 Copy Result</button>
            </div>
        `;
    }

    calculateBtn.addEventListener('click', calculateFlames);
    [name1Input, name2Input].forEach(input => input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') calculateFlames();
    }));
}