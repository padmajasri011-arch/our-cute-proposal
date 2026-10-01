// =========================================================
// GLOBAL WEBSITE INTERACTIONS
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PAGE TRANSITIONS
    ===================================================== */

    const links =
        document.querySelectorAll("a[href]");


    links.forEach(link => {

        link.addEventListener("click", event => {

            const href =
                link.getAttribute("href");


            if (
                !href ||
                href.startsWith("#") ||
                href.startsWith("http") ||
                href.startsWith("mailto:")
            ) {
                return;
            }


            event.preventDefault();

            document.body.classList.add(
                "page-leaving"
            );


            setTimeout(() => {

                window.location.href = href;

            }, 500);

        });

    });


    /* =====================================================
       CLICK HEARTS
    ===================================================== */

    document.addEventListener("click", event => {

        if (
            event.target.closest(".proposal-yes") ||
            event.target.closest(".gift-button") ||
            event.target.closest(".envelope-wrapper")
        ) {
            return;
        }


        createClickHeart(
            event.clientX,
            event.clientY
        );

    });


    function createClickHeart(x, y) {

        const heart =
            document.createElement("span");

        const hearts = [
            "💗",
            "💕",
            "💖",
            "💓",
            "💞"
        ];


        heart.className =
            "click-heart";


        heart.textContent =
            hearts[
                Math.floor(
                    Math.random() *
                    hearts.length
                )
            ];


        heart.style.left =
            `${x}px`;

        heart.style.top =
            `${y}px`;


        heart.style.setProperty(
            "--heart-x",
            `${(Math.random() - 0.5) * 100}px`
        );

        heart.style.setProperty(
            "--heart-y",
            `${-60 - Math.random() * 80}px`
        );


        document.body.appendChild(
            heart
        );


        setTimeout(() => {

            heart.remove();

        }, 900);

    }


    /* =====================================================
       CURSOR SPARKLES
    ===================================================== */

    let lastSparkleTime = 0;


    document.addEventListener(
        "mousemove",
        event => {

            const now =
                Date.now();


            if (
                now - lastSparkleTime < 80
            ) {
                return;
            }


            lastSparkleTime = now;


            createCursorSparkle(
                event.clientX,
                event.clientY
            );

        }
    );


    function createCursorSparkle(x, y) {

        const sparkle =
            document.createElement("span");


        sparkle.className =
            "cursor-sparkle";


        sparkle.textContent =
            Math.random() > 0.5
                ? "✦"
                : "✧";


        sparkle.style.left =
            `${x}px`;

        sparkle.style.top =
            `${y}px`;


        document.body.appendChild(
            sparkle
        );


        setTimeout(() => {

            sparkle.remove();

        }, 700);

    }

});


// =========================================================
// BACKEND MESSAGE
// =========================================================

async function getCuteMessage() {

    try {

        const response =
            await fetch("/api/message");

        const data =
            await response.json();


        const messageElement =
            document.getElementById(
                "backendMessage"
            );


        if (messageElement) {

            messageElement.textContent =
                `${data.message} ${data.hearts}`;

        }

    } catch (error) {

        console.error(
            "Backend connection failed:",
            error
        );

    }

}


getCuteMessage();


// =========================================================
// PERSONALIZED NAME
// =========================================================

const nameInput =
    document.getElementById("nameInput");

const nameButton =
    document.getElementById("nameButton");

const personalizedMessage =
    document.getElementById(
        "personalizedMessage"
    );


// Get previously saved name
const savedName =
    localStorage.getItem(
        "proposalName"
    );


// Show saved name
if (
    nameInput &&
    personalizedMessage &&
    savedName
) {

    nameInput.value =
        savedName;

    personalizedMessage.textContent =
        `Welcome back, ${savedName}! 💗`;

}


// Make it personal
if (nameButton) {

    nameButton.addEventListener(
        "click",
        async () => {

            const name =
                nameInput.value.trim();


            // Empty name
            if (!name) {

                personalizedMessage.textContent =
                    "🥹 Enter your name first...";

                return;

            }


            // Send name to backend
            try {

                const response =
                    await fetch(
                        "/api/personalize",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                name: name
                            })
                        }
                    );


                const data =
                    await response.json();


                // Save name in browser
                localStorage.setItem(
                    "proposalName",
                    name
                );


                // Show backend response
                personalizedMessage.textContent =
                    data.message;


            } catch (error) {

                console.error(
                    "Personalization failed:",
                    error
                );

                personalizedMessage.textContent =
                    "🥺 Something went wrong. Try again!";

            }

        }
    );

}