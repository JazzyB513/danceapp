document.addEventListener("DOMContentLoaded", () => {

    // Example Parent Billing Data
    const studentBilling = [
        {
            name: "Ava Johnson",
            classes: [
                { className: "Ballet I", amount: 55 },
                { className: "Jazz I", amount: 60 }
            ],
            discounts: [
                { label: "Sibling Discount", amount: -10 }
            ]
        },
        {
            name: "Sophie Johnson",
            classes: [
                { className: "Hip Hop II", amount: 65 },
                { className: "Tap II", amount: 50 },
                { className: "Lyrical", amount: 55 }
            ],
            discounts: []
        }
    ];

    const container = document.getElementById("studentsContainer");

    // Build Student Cards
    studentBilling.forEach((student, index) => {
        const totalClassCost = student.classes.reduce((sum, c) => sum + c.amount, 0);
        const totalDiscounts = student.discounts.reduce((sum, d) => sum + d.amount, 0);
        const finalTotal = totalClassCost + totalDiscounts;

        const studentCard = document.createElement("div");
        studentCard.className = "student-card";

        studentCard.innerHTML = `
            <div class="student-header" data-index="${index}">
                <h2>${student.name}</h2>
                <p class="tuition-total">$${finalTotal}</p>
            </div>

            <div class="student-details hidden">

                <h3>Class Charges</h3>
                <ul class="charges-list">
                    ${student.classes
                        .map(c => `<li>${c.className} — $${c.amount}</li>`)
                        .join("")}
                </ul>

                ${student.discounts.length > 0 ? `
                    <h3>Discounts</h3>
                    <ul class="discount-list">
                        ${student.discounts
                            .map(d => `<li>${d.label}: $${d.amount}</li>`)
                            .join("")}
                    </ul>
                ` : ""}

            </div>
        `;

        container.appendChild(studentCard);
    });

    // Expand / collapse student details
    document.querySelectorAll(".student-header").forEach(header => {
        header.addEventListener("click", () => {
            const card = header.parentElement;
            const details = card.querySelector(".student-details");
            details.classList.toggle("hidden");
        });
    });

    // Payment submission (placeholder)
    document.getElementById("submitPayment").addEventListener("click", () => {
        const amount = document.getElementById("paymentAmount").value;

        if (!amount || amount <= 0) {
            alert("Please enter a valid payment amount.");
            return;
        }

        alert(`Payment of $${amount} submitted! (This will later connect to your payment system.)`);
    });

});
