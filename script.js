/*=====================================================
 SMARTPAY AI
 script.js
 PART 1
======================================================*/


/*==============================
 APPLICATION DATA
===============================*/

let appData = {

    totalBalance: 1502,

    reserveAmount: 500,

    health: 94,

    selectedBank: "hdfc",

    banks: {

        hdfc: 500,

        sbi: 500,

        icici: 502

    },

    transactions: []

};



/*==============================
 LOAD LOCAL STORAGE
===============================*/

function loadData() {

    const data = localStorage.getItem("smartpay");

    if (data) {

        appData = JSON.parse(data);

    }

}



/*==============================
 SAVE LOCAL STORAGE
===============================*/

function saveData() {

    localStorage.setItem(

        "smartpay",

        JSON.stringify(appData)

    );

}



/*==============================
 SAFE SPEND
===============================*/

function getSafeSpend() {

    return appData.totalBalance -

        appData.reserveAmount;

}



/*==============================
 UPDATE DASHBOARD
===============================*/

function updateDashboard() {

    const total = document.getElementById("totalBalance");

    if (total) {

        total.innerHTML =

            "₹" + appData.totalBalance;

    }


    const reserve =

        document.getElementById("reservedAmount");

    if (reserve) {

        reserve.innerHTML =

            "₹" + appData.reserveAmount;

    }


    const safe =

        document.getElementById("safeSpend");

    if (safe) {

        safe.innerHTML =

            "₹" + getSafeSpend();

    }


    const health =

        document.getElementById("healthScore");

    if (health) {

        health.innerHTML =

            appData.health + "%";

    }


    const hdfc =

        document.getElementById("hdfcBalance");

    if (hdfc) {

        hdfc.innerHTML =

            "₹" + appData.banks.hdfc;

    }


    const sbi =

        document.getElementById("sbiBalance");

    if (sbi) {

        sbi.innerHTML =

            "₹" + appData.banks.sbi;

    }


    const icici =

        document.getElementById("iciciBalance");

    if (icici) {

        icici.innerHTML =

            "₹" + appData.banks.icici;

    }


    updateAIMessage();

}



/*==============================
 AI MESSAGE
===============================*/

function updateAIMessage() {

    const ai =

        document.getElementById("aiMessage");

    if (!ai) return;

    const safe = getSafeSpend();

    ai.innerHTML =

        `You can safely spend

    <b>₹${safe}</b>

    today without affecting

    your monthly savings goal.

    Reserve

    <b>₹${appData.reserveAmount}</b>

    this month.`;

}



/*==============================
 INVESTMENT MESSAGE
===============================*/

function updateInvestment() {

    const invest =

        document.getElementById("investmentMessage");

    if (!invest) return;

    if (appData.reserveAmount < 500) {

        invest.innerHTML =

            "Minimum reserve amount should be ₹500 before investing.";

    } else if (appData.reserveAmount < 650) {

        invest.innerHTML =

            "AI recommends buying 1 Tata Power share (~₹300).";

    } else {

        invest.innerHTML =

            "Excellent! AI recommends buying 2 Tata Power shares while keeping your emergency fund safe.";

    }

}



/*==============================
 SAVE GOAL
===============================*/

const saveGoal =

    document.getElementById("saveGoal");

if (saveGoal) {

    saveGoal.onclick = function() {

        const amount =

            Number(

                document.getElementById("goalInput").value

            );

        if (amount < 500) {

            alert(

                "Minimum reserve amount is ₹500"

            );

            return;

        }

        appData.reserveAmount = amount;

        saveData();

        updateDashboard();

        updateInvestment();

        document.getElementById(

            "goalPopup"

        ).style.display = "none";

    };

}



/*==============================
 EDIT GOAL
===============================*/

const editGoal =

    document.getElementById(

        "editReserve"

    );

if (editGoal) {

    editGoal.onclick = function() {

        document.getElementById(

            "goalPopup"

        ).style.display = "flex";

    };

}



/*==============================
 CANCEL GOAL
===============================*/

const cancelGoal =

    document.getElementById(

        "cancelGoal"

    );

if (cancelGoal) {

    cancelGoal.onclick = function() {

        document.getElementById(

            "goalPopup"

        ).style.display = "none";

    };

}



/*==============================
 INITIALIZE
===============================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        loadData();

        updateDashboard();

        updateInvestment();

        saveData();

    }

);
/*=====================================================
 SMARTPAY AI
 PART 2
 PAYMENT ENGINE
======================================================*/


/*==============================
SELECT BANK
===============================*/

const bankCards = document.querySelectorAll(".select-bank");

bankCards.forEach(card => {

    card.onclick = function() {

        bankCards.forEach(item => {

            item.classList.remove("active-bank");

        });

        this.classList.add("active-bank");

        appData.selectedBank =

            this.dataset.bank;

    };

});



/*==============================
PAY BUTTON
===============================*/

const payButton =

    document.getElementById("payButton");

if (payButton) {

    payButton.onclick = startPayment;

}



/*==============================
START PAYMENT
===============================*/

function startPayment() {

    const amount =

        Number(

            document.getElementById(

                "paymentAmount"

            ).value

        );

    if (amount <= 0) {

        alert("Enter payment amount");

        return;

    }

    localStorage.setItem(

        "paymentAmount",

        amount

    );

    showAnalysis(amount);

}



/*==============================
AI ANALYSIS
===============================*/

function showAnalysis(amount) {

    const overlay =

        document.getElementById(

            "analysisOverlay"

        );

    const status =

        document.getElementById(

            "analysisStatus"

        );

    const progress =

        document.getElementById(

            "progressFill"

        );

    overlay.style.display = "flex";

    progress.style.width = "0%";

    const steps = [

        "Connecting to HDFC Bank...",

        "Checking linked accounts...",

        "Calculating reserve amount...",

        "Analysing spending pattern...",

        "Generating AI recommendation..."

    ];

    let i = 0;

    status.innerHTML = steps[i];

    const timer = setInterval(() => {

        i++;

        progress.style.width = (i * 20) + "%";

        if (i < steps.length) {

            status.innerHTML = steps[i];

        }

        if (i === steps.length) {

            clearInterval(timer);

            setTimeout(() => {

                overlay.style.display = "none";

                analysePayment(amount);

            }, 700);

        }

    }, 700);

}



/*==============================
AI DECISION
===============================*/

function analysePayment(amount) {

    const safe =

        getSafeSpend();

    if (amount <= safe) {

        showSafePopup(amount);

    } else {

        showWarning(amount);

    }

}



/*==============================
SAFE PAYMENT
===============================*/

function showSafePopup(amount) {

    const popup =

        document.getElementById(

            "safePopup"

        );

    const msg =

        document.getElementById(

            "safeMessage"

        );

    msg.innerHTML =

        `

Payment Amount

<b>₹${amount}</b>

<br><br>

Great!

Your savings goal

<b>₹${appData.reserveAmount}</b>

will remain protected.

`;

    popup.style.display = "flex";

}



/*==============================
WARNING
===============================*/

function showWarning(amount) {

    const popup =

        document.getElementById(

            "warningPopup"

        );

    const msg =

        document.getElementById(

            "warningMessage"

        );

    const suggested =

        document.getElementById(

            "suggestedAmount"

        );

    const safe =

        getSafeSpend();

    msg.innerHTML =

        `

⚠️ Payment Amount

<b>₹${amount}</b>

<br><br>

Safe Spend

<b>₹${safe}</b>

<br><br>

If you continue,

your reserve amount

will be affected.

`;

    suggested.innerHTML =

        "₹" + safe;

    popup.style.display = "flex";

}



/*==============================
CHANGE AMOUNT
===============================*/

const changeAmount =

    document.getElementById(

        "changeAmount"

    );

if (changeAmount) {

    changeAmount.onclick = function() {

        document.getElementById(

            "warningPopup"

        ).style.display = "none";

        document.getElementById(

            "changePopup"

        ).style.display = "flex";

    };

}



/*==============================
EDIT PAYMENT
===============================*/

const editPayment =

    document.getElementById(

        "editPayment"

    );

if (editPayment) {

    editPayment.onclick = function() {

        document.getElementById(

            "changePopup"

        ).style.display = "none";

        document.getElementById(

            "paymentAmount"

        ).focus();

    };

}



/*==============================
IGNORE AI
===============================*/

const ignore =

    document.getElementById(

        "ignoreSuggestion"

    );

if (ignore) {

    ignore.onclick = function() {

        document.getElementById(

            "changePopup"

        ).style.display = "none";

        completePayment();

    };

}
/*=====================================================
 SMARTPAY AI
 PART 3
 COMPLETE PAYMENT
======================================================*/


/*==============================
COMPLETE PAYMENT
===============================*/

function completePayment() {

    const amount = Number(

        localStorage.getItem("paymentAmount")

    );

    let bank = appData.selectedBank;

    // Deduct from selected bank first

    if (appData.banks[bank] >= amount) {

        appData.banks[bank] -= amount;

    } else {

        let remaining = amount;

        const order = ["hdfc", "sbi", "icici"];

        for (let i = 0; i < order.length; i++) {

            let b = order[i];

            if (remaining <= 0) break;

            if (appData.banks[b] >= remaining) {

                appData.banks[b] -= remaining;

                remaining = 0;

            } else {

                remaining -= appData.banks[b];

                appData.banks[b] = 0;

            }

        }

    }


    // Update Total Balance

    appData.totalBalance =

        appData.banks.hdfc +

        appData.banks.sbi +

        appData.banks.icici;


    // Financial Health

    updateHealth(amount);


    // Save Transaction

    appData.transactions.unshift({

        title: "UPI Payment",

        amount: amount,

        date: new Date().toLocaleDateString(),

        time: new Date().toLocaleTimeString()

    });


    if (appData.transactions.length > 20) {

        appData.transactions.pop();

    }


    saveData();


    localStorage.setItem(

        "remainingBalance",

        appData.totalBalance

    );


    window.location.href =

        "success.html";

}



/*==============================
FINANCIAL HEALTH
===============================*/

function updateHealth(amount) {

    const safe = getSafeSpend();

    if (amount <= safe * 0.40) {

        appData.health = 98;

    } else if (amount <= safe * 0.70) {

        appData.health = 90;

    } else if (amount <= safe) {

        appData.health = 80;

    } else if (amount <= safe + 150) {

        appData.health = 60;

    } else {

        appData.health = 35;

    }

}



/*==============================
CONTINUE PAYMENT
===============================*/

const continuePayment =

    document.getElementById(

        "continuePayment"

    );

if (continuePayment) {

    continuePayment.onclick = function() {

        document.getElementById(

            "warningPopup"

        ).style.display = "none";

        completePayment();

    };

}



/*==============================
SAFE PAY
===============================*/

const payNow =

    document.getElementById(

        "payNow"

    );

if (payNow) {

    payNow.onclick = function() {

        document.getElementById(

            "safePopup"

        ).style.display = "none";

        completePayment();

    };

}



/*==============================
LOAD SUCCESS PAGE
===============================*/

function loadSuccess() {

    const paid =

        document.getElementById(

            "paidAmount"

        );

    if (!paid) return;

    const payment =

        Number(

            localStorage.getItem(

                "paymentAmount"

            )

        );

    const remaining =

        Number(

            localStorage.getItem(

                "remainingBalance"

            )

        );

    paid.innerHTML =

        "₹" + payment;

    document.getElementById(

            "remainingBalance"

        ).innerHTML =

        "₹" + remaining;

    document.getElementById(

            "reservedBalance"

        ).innerHTML =

        "₹" + appData.reserveAmount;

    document.getElementById(

            "healthPercentage"

        ).innerHTML =

        appData.health + "%";

    const healthBar =

        document.getElementById(

            "healthBar"

        );

    if (healthBar) {

        healthBar.style.width =

            appData.health + "%";

        if (appData.health >= 90) {

            healthBar.style.background =

                "#22C55E";

        } else if (appData.health >= 70) {

            healthBar.style.background =

                "#FACC15";

        } else {

            healthBar.style.background =

                "#EF4444";

        }

    }

}



/*==============================
AI RESULT MESSAGE
===============================*/

function loadResult() {

    const msg =

        document.getElementById(

            "resultMessage"

        );

    if (!msg) return;

    if (appData.health >= 90) {

        msg.innerHTML =

            "Excellent decision. Your savings goal is protected. Keep saving consistently.";

    } else if (appData.health >= 70) {

        msg.innerHTML =

            "Payment completed successfully. Monitor your spending this week.";

    } else {

        msg.innerHTML =

            "Warning: Your spending is high this month. Try reducing unnecessary expenses.";

    }

}



/*==============================
INVESTMENT RESULT
===============================*/

function loadInvestmentResult() {

    const result =

        document.getElementById(

            "investmentResult"

        );

    if (!result) return;

    if (appData.reserveAmount < 500) {

        result.innerHTML =

            "Increase your reserve amount to ₹500 before investing.";

    } else if (appData.reserveAmount < 650) {

        result.innerHTML =

            "AI recommends buying 1 Tata Power share (~₹300).";

    } else {

        result.innerHTML =

            "AI recommends buying 2 Tata Power shares while keeping your emergency fund safe.";

    }

}



/*==============================
AUTO LOAD SUCCESS
===============================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        loadData();

        loadSuccess();

        loadResult();

        loadInvestmentResult();

    });
/*=====================================================
 SMARTPAY AI
 PART 4
 AI ASSISTANT
======================================================*/


/*==============================
AI WINDOW
===============================*/

const aiButton = document.getElementById("aiAssistant");
const aiWindow = document.getElementById("aiChat");
const closeAI = document.getElementById("closeAI");

if (aiButton) {

    aiButton.onclick = function() {

        aiWindow.style.display = "flex";

    };

}

if (closeAI) {

    closeAI.onclick = function() {

        aiWindow.style.display = "none";

    };

}



/*==============================
CHAT BOT
===============================*/

const sendButton = document.getElementById("sendChat");

if (sendButton) {

    sendButton.onclick = sendMessage;

}

const input = document.getElementById("chatInput");

if (input) {

    input.addEventListener("keypress", function(e) {

        if (e.key === "Enter") {

            sendMessage();

        }

    });

}



/*==============================
SEND MESSAGE
===============================*/

function sendMessage() {

    const input = document.getElementById("chatInput");

    const body = document.getElementById("chatBody");

    if (!input || input.value.trim() == "") return;

    const message = input.value;

    body.innerHTML += `

<div class="user-msg">

${message}

</div>

`;

    input.value = "";

    setTimeout(() => {

        replyAI(message);

    }, 500);

}



/*==============================
AI REPLY
===============================*/

function replyAI(question) {

    const body = document.getElementById("chatBody");

    let reply = "";

    const q = question.toLowerCase();

    const safe = getSafeSpend();



    /*---------------------------
    SAFE SPEND
    ----------------------------*/

    if (

        q.includes("spend") ||

        q.includes("safe")

    ) {

        reply =

            `You can safely spend

<b>₹${safe}</b>

without affecting your

₹${appData.reserveAmount}

savings goal.`;

    }



    /*---------------------------
    INVEST
    ----------------------------*/
    else if (

        q.includes("invest")

    ) {

        if (appData.reserveAmount < 500) {

            reply =

                `Increase your reserve amount to

₹500

before investing.`;

        } else if (appData.reserveAmount < 650) {

            reply =

                `I recommend buying

<b>1 Tata Power Share</b>

(Approx ₹300).`;

        } else {

            reply =

                `Excellent!

You can safely buy

<b>2 Tata Power Shares</b>

while keeping your emergency fund protected.`;

        }

    }



    /*---------------------------
    PAYMENT
    ----------------------------*/
    else if (

        q.includes("1000")

        ||

        q.includes("pay")

    ) {

        if (1000 > safe) {

            reply =

                `⚠️

A payment of

₹1000

will affect your

₹${appData.reserveAmount}

reserve.

Recommended payment:

<b>₹${safe}</b>.`;

        } else {

            reply =

                `₹1000 payment is safe.

Your savings goal will remain protected.`;

        }

    }



    /*---------------------------
    SAVINGS
    ----------------------------*/
    else if (

        q.includes("saving")

        ||

        q.includes("reserve")

    ) {

        reply =

            `Your current reserve amount is

<b>₹${appData.reserveAmount}</b>.`;

    }



    /*---------------------------
    HEALTH
    ----------------------------*/
    else if (

        q.includes("health")

    ) {

        reply =

            `Your Financial Health Score is

<b>${appData.health}%</b>.`;

    }



    /*---------------------------
    BALANCE
    ----------------------------*/
    else if (

        q.includes("balance")

    ) {

        reply =

            `Your available balance is

<b>₹${appData.totalBalance}</b>.`;

    }



    /*---------------------------
    LOAN
    ----------------------------*/
    else if (

        q.includes("loan")

    ) {

        reply =

            `Home Loan:

25 June

Car Loan:

18 June

Personal Loan:

Tomorrow`;

    }



    /*---------------------------
    DEFAULT
    ----------------------------*/
    else {

        reply =

            `Hello Gowtham 👋

I can help you with

• Payments

• Savings

• Investments

• Loans

• Financial Health

Try asking:

Can I spend ₹900?

Should I invest?

Show my balance.`;

    }



    /*==============================
    SHOW AI MESSAGE
    ===============================*/

    body.innerHTML += `

<div class="ai-msg">

${reply}

</div>

`;

    body.scrollTop = body.scrollHeight;

}



/*==============================
AUTO OPEN
===============================*/

setTimeout(() => {

    const body = document.getElementById(

        "chatBody"

    );

    if (body) {

        body.scrollTop = body.scrollHeight;

    }

}, 300);
/*=====================================================
 SMARTPAY AI
 PART 5
 SMART INSIGHTS
======================================================*/


/*==============================
LOAD TRANSACTIONS
===============================*/

function loadTransactions() {

    const container =

        document.getElementById(

            "transactionContainer"

        );

    if (!container) return;

    if (appData.transactions.length == 0) return;

    container.innerHTML = "";

    appData.transactions.forEach(item => {

        container.innerHTML += `

<div class="transaction-card">

<div class="transaction-left">

<div class="transaction-icon">

<i class="ri-bank-card-fill"></i>

</div>

<div>

<h3>${item.title}</h3>

<p>${item.date}</p>

</div>

</div>

<div class="transaction-right">

<h3>- ₹${item.amount}</h3>

<small>${item.time}</small>

</div>

</div>

`;

    });

}



/*==============================
SMART SUGGESTION
===============================*/

function smartSuggestion() {

    const ai =

        document.getElementById(

            "aiMessage"

        );

    if (!ai) return;

    const safe =

        getSafeSpend();

    let text = "";

    if (safe < 300) {

        text =

            `⚠️ Your spendable amount is only

<b>₹${safe}</b>.

Avoid unnecessary purchases this month.`;

    } else if (safe < 700) {

        text =

            `😊 You can safely spend

<b>₹${safe}</b>.

Try to keep at least

₹${appData.reserveAmount}

reserved.`;

    } else {

        text =

            `🎉 Excellent!

You have

<b>₹${safe}</b>

available.

Your financial health looks great.`;

    }

    ai.innerHTML = text;

}



/*==============================
LOAN STATUS
===============================*/

function updateLoanStatus() {

    const home =

        document.getElementById("homeLoan");

    const car =

        document.getElementById("carLoan");

    const personal =

        document.getElementById("personalLoan");

    if (home) {

        home.className = "loan-safe";

    }

    if (car) {

        car.className = "loan-warning";

    }

    if (personal) {

        personal.className = "loan-danger";

    }

}



/*==============================
FINANCIAL HEALTH COLOR
===============================*/

function updateHealthCard() {

    const score =

        document.getElementById(

            "healthPercentage"

        );

    if (!score) return;

    if (appData.health >= 90) {

        score.style.color = "#22C55E";

    } else if (appData.health >= 70) {

        score.style.color = "#FACC15";

    } else {

        score.style.color = "#EF4444";

    }

}



/*==============================
BANK TOTAL
===============================*/

function updateTotal() {

    appData.totalBalance =

        appData.banks.hdfc +

        appData.banks.sbi +

        appData.banks.icici;

    const total =

        document.getElementById(

            "linkedBalance"

        );

    if (total) {

        total.innerHTML =

            "₹" + appData.totalBalance;

    }

}



/*==============================
RESERVE VALIDATION
===============================*/

function validateReserve() {

    if (appData.reserveAmount < 500) {

        alert(

            "Reserve amount should be minimum ₹500"

        );

        appData.reserveAmount = 500;

        saveData();

    }

}



/*==============================
AI INVESTMENT ENGINE
===============================*/

function investmentEngine() {

    const invest =

        document.getElementById(

            "investmentMessage"

        );

    if (!invest) return;

    let reserve =

        appData.reserveAmount;

    if (reserve < 500) {

        invest.innerHTML =

            "❌ Minimum reserve amount should be ₹500.";

    } else if (reserve >= 500 && reserve < 650) {

        invest.innerHTML =

            "💡 AI Suggestion: Buy 1 Tata Power Share (~₹300).";

    } else if (reserve >= 650 && reserve < 1000) {

        invest.innerHTML =

            "📈 AI Suggestion: Buy 2 Tata Power Shares.";

    } else {

        invest.innerHTML =

            "🚀 Excellent! Your savings are strong. Diversify into Tata Power + SBI ETF.";

    }

}



/*==============================
AUTO REFRESH
===============================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        loadTransactions();

        smartSuggestion();

        updateLoanStatus();

        updateHealthCard();

        updateTotal();

        validateReserve();

        investmentEngine();

    });
/*=====================================================
 SMARTPAY AI
 PART 6
 FINAL ENGINE
======================================================*/


/*==============================
LIVE PAYMENT VALIDATION
===============================*/

const paymentInput =
    document.getElementById("paymentAmount");

if (paymentInput) {

    paymentInput.addEventListener("input", validatePayment);

}

function validatePayment() {

    const amount = Number(paymentInput.value);

    const safe = getSafeSpend();

    const note = document.getElementById("paymentSuggestion");

    if (!note) return;

    if (amount === 0) {

        note.innerHTML =
            `Enter payment amount.`;

        return;

    }

    if (amount <= safe) {

        note.innerHTML =

            `✅ AI Analysis

This payment is SAFE.

Your ₹${appData.reserveAmount}

reserve will remain protected.`;

        note.style.color = "#22C55E";

    } else {

        let suggest = Math.max(
            500,
            safe - 350
        );

        note.innerHTML =

            `⚠️ AI Recommendation

This payment may affect your savings.

Recommended Payment:

<b>₹${suggest}</b>

to keep your

₹${appData.reserveAmount}

reserve safe.`;

        note.style.color = "#FACC15";

    }

}



/*==============================
TOAST
===============================*/

function showToast(message) {

    let toast = document.getElementById("toast");

    if (!toast) {

        toast = document.createElement("div");

        toast.id = "toast";

        document.body.appendChild(toast);

    }

    toast.innerHTML = message;

    toast.style.display = "block";

    setTimeout(() => {

        toast.style.display = "none";

    }, 2500);

}



/*==============================
AUTO SAVE
===============================*/

setInterval(() => {

    saveData();

}, 2000);



/*==============================
RESET DEMO
===============================*/

function resetDemo() {

    localStorage.removeItem("smartpay");

    localStorage.removeItem("paymentAmount");

    localStorage.removeItem("remainingBalance");

    location.reload();

}



/*==============================
GLOBAL AI
===============================*/

window.smartAI = {

    safeSpend: getSafeSpend,

    health: () => appData.health,

    balance: () => appData.totalBalance,

    reserve: () => appData.reserveAmount,

    reset: resetDemo

};



/*==============================
FINAL INIT
===============================*/

document.addEventListener("DOMContentLoaded", () => {

    loadData();

    updateDashboard();

    updateInvestment();

    loadTransactions();

    smartSuggestion();

    investmentEngine();

    updateLoanStatus();

    updateHealthCard();

    updateTotal();

    validatePayment();

    showToast("🤖 SmartPay AI Ready");

});
