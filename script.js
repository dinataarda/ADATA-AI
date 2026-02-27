// ISI DENGAN API KEY GROQ KAMU
const GROQ_API_KEY = "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"; 

function validatePin() {
    const pin = document.getElementById('pinField').value;
    if(pin === "1083") {
        document.getElementById('pinOverlay').style.display = 'none';
    } else {
        alert("PIN SALAH!");
        document.getElementById('pinField').value = '';
    }
}

function toggleSidebar() {
    const sb = document.getElementById('sidebar');
    const ov = document.getElementById('darkOverlay');
    sb.classList.toggle('active');
    ov.style.display = sb.classList.contains('active') ? 'block' : 'none';
}

function fillPrompt(txt) {
    document.getElementById('userInput').value = txt;
    document.getElementById('userInput').focus();
    toggleSidebar();
}

async function doSend() {
    const input = document.getElementById('userInput');
    const box = document.getElementById('chatBox');
    const text = input.value.trim();
    
    if(!text) return;

    // Tampilkan Pesan User
    box.innerHTML += `<div class="bubble user">${text}</div>`;
    input.value = "";
    box.scrollTop = box.scrollHeight;

    // Loading indicator
    const aiId = "ai-" + Date.now();
    box.innerHTML += `<div class="bubble ai" id="${aiId}"><i>Hyperion sedang memproses...</i></div>`;
    box.scrollTop = box.scrollHeight;

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [{ role: "user", content: text }]
            })
        });

        const data = await response.json();
        
        if (data.choices && data.choices[0].message) {
            document.getElementById(aiId).innerText = data.choices[0].message.content;
        } else {
            document.getElementById(aiId).innerText = "Error: Key bermasalah atau kuota habis.";
        }
    } catch (error) {
        document.getElementById(aiId).innerText = "Koneksi Gagal. Pastikan internet aktif.";
    }
    box.scrollTop = box.scrollHeight;
}
