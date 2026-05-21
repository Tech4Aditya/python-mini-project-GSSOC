function getTypingSpeedTesterHTML() {
    return `
        <div class="project-content">

            <h2>⌨️ Typing Speed Tester</h2>

            <p style="margin-bottom: 10px;">
                Type the exact sentence shown below 👇
            </p>
            

            <div 
                id="typingSentence"
                style="
                    background: var(--surface-color);
                    color: var(--text-color);
                    padding: 15px;
                    border-radius: 10px;
                    margin-bottom: 20px;
                    font-size: 18px;
                    line-height: 1.8;
                    min-height: 80px;
                "
            >
                Click Start Test 🚀
            </div>

            <button
                id="startTypingBtn"
                type="button"
                class="btn-generate"
                style="
                    margin-bottom: 20px;
                    font-weight: 700;
                    font-size: 16px;
                    width:auto;   
                    min-height: 44px;
                    padding: 12px 24px;               
                    border-radius: 30px;
                    background-color:var(--accent-color);
                    color:white;
                "
            >
                Start Test 🚀
            </button>

            <button
                id="newSentenceBtn"
                type="button"
                class="btn-generate"
                style="
                    margin-bottom: 20px;
                    margin-left: 10px;
                    font-weight: 700;
                    font-size: 16px;
                    width:auto;
                    min-height: 44px;
                    padding: 12px 24px;
                    border-radius: 30px;
                    background-color:#9333ea;
                    color:white;
                "
            >
                🔄 New Sentence
            </button>

            <div>
            <textarea
            id="typingInput"
            placeholder="Start typing here..."
            rows="5"
            disabled
            style="
            width: 100%;
            padding: 15px;
            border-radius: 10px;
            font-size: 16px;
            margin-bottom: 20px;
            background: var(--surface-color);
            color: var(--text-color);
            border: 1px solid var(--border-color);
            "
            ></textarea>
            </div>
        

            <div
                id="typingResult"
                style="
                    margin-top: 25px;
                    font-size: 18px;
                    line-height: 1.8;
                "
            ></div>

        </div>
    `;
}

function initTypingSpeedTester() {

    const sentences = [
        "Python is fun to learn",
        "Practice makes perfect",
        "Open source is amazing",
        "Typing speed improves daily",
        "Coding becomes easier with practice"
    ];

    const sentenceElement =
        document.getElementById("typingSentence");

    const inputElement =
        document.getElementById("typingInput");

    const button =
        document.getElementById("startTypingBtn");

    const newSentenceBtn =
        document.getElementById("newSentenceBtn");

    const result =
        document.getElementById("typingResult");

    if (
        !sentenceElement ||
        !inputElement ||
        !button ||
        !newSentenceBtn ||
        !result
    ) {
        return;
    }

    let startTime = null;
    let currentSentence = "";

    inputElement.disabled = true;
    inputElement.setAttribute("aria-disabled", "true");

    function generateSentence() {

        currentSentence =
            sentences[
                Math.floor(
                    Math.random() * sentences.length
                )
            ];

        sentenceElement.innerHTML =
            currentSentence
                .split("")
                .map(function (char) {
                    return "<span>" + char + "</span>";
                })
                .join("");

        inputElement.value = "";
        inputElement.disabled = false;
        inputElement.removeAttribute("aria-disabled");
        inputElement.focus();

        result.innerHTML = "";
        startTime = Date.now();
    }

    // Start Test
    button.onclick = function () {

        generateSentence();
    };

    newSentenceBtn.onclick = function () {

        generateSentence();
    };

    inputElement.addEventListener("input", function () {

        if (!startTime || !currentSentence) return;

        const typedText = inputElement.value;
        const totalTime = Math.max((Date.now() - startTime) / 1000, 0.001);

        // Correct characters
        let correctChars = 0;

        //Incorrect characters
        let incorrectChars = 0;


        const spans = sentenceElement.querySelectorAll("span");

        for (let i = 0; i < spans.length; i++) {
            spans[i].style.color = "";
        }

        for (let i = 0; i < typedText.length; i++) {

            if (
                typedText[i]?.toLowerCase() ===
                currentSentence[i]?.toLowerCase()
            ) {

                correctChars++;

                if (spans[i]) spans[i].style.color = "#22c55e";

            } else {
                incorrectChars++;
                if (spans[i]) spans[i].style.color = "#ef4444";
            }
        }

        const accuracy =
            currentSentence.length
                ? Math.round(
                    (correctChars / currentSentence.length) * 100
                )
                : 0;

        const mistakes = incorrectChars;

        // Words typed
        const wordsTyped =
            typedText.trim().split(" ").length;

        // WPM
        const wpm =
            Math.round((wordsTyped / totalTime) * 60);


        // Show live stats
        result.innerHTML = `
            ⏱️ Time: ${totalTime.toFixed(1)} sec <br><br>

            🚀 Speed: ${wpm} WPM <br><br>

            🎯 Accuracy: ${accuracy}% <br><br>

            ✅ Correct Characters: ${correctChars} <br><br>

            ❌ Incorrect Characters: ${incorrectChars} <br><br>

            ⚠️ Mistakes: ${mistakes} 
        `;

        // Completed
       if (
            typedText.length === currentSentence.length
        ) {

            result.innerHTML = `

            🎉 Test Completed Successfully! <br><br>

            ⏱️ Total Time: ${totalTime.toFixed(1)} sec <br><br>

            🚀 Typing Speed: ${wpm} WPM <br><br>

            🎯 Accuracy: ${accuracy}% <br><br>

            ✅ Correct Characters: ${correctChars} <br><br>

            ❌ Incorrect Characters: ${incorrectChars} <br><br>

            ⚠️ Mistakes: ${mistakes}

        `;

        inputElement.disabled = true;
        inputElement.setAttribute("aria-disabled", "true");
        inputElement.blur();
        }
    });
}