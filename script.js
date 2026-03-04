function toggleSpecificDate() {
    document.getElementById('specificDateIn').style.display = 
        document.getElementById('dateTypeIn').value === 'especifica' ? 'block' : 'none';
}

function renderAllImages() {
    const gallery = document.getElementById('output-gallery');
    gallery.innerHTML = '';
    const rawLines = document.getElementById('textIn').value.split('\n').filter(l => l.trim() !== "");
    const tone = document.getElementById('toneIn').value;
    const startWithMe = document.getElementById('startWithMe').checked;
    
    let hour = parseInt(document.getElementById('hourIn').value);
    let min = parseInt(document.getElementById('minuteIn').value);
    let ampm = document.getElementById('ampmIn').value;
    let lineIdx = 0;
    let imgIdx = 1;

    while(lineIdx < rawLines.length && imgIdx <= 15) {
        const phone = document.getElementById('phone-template').children[0].cloneNode(true);
        const chat = phone.querySelector('.chat-area');
        
        // Personalización de Contacto
        phone.querySelector('.name-display').innerText = document.getElementById('nameIn').value;
        phone.querySelector('.status-display').innerText = document.getElementById('statusIn').value;
        const photo = document.getElementById('photoIn').value;
        if(photo) phone.querySelector('.avatar-display').src = photo;

        // Fecha y Cifrado (Solo en la primera imagen)
        if(imgIdx === 1) {
            const dVal = document.getElementById('dateTypeIn').value;
            chat.innerHTML += `<div class="date-label">${dVal === 'especifica' ? document.getElementById('specificDateIn').value : dVal}</div>`;
            if(document.getElementById('encryptionIn').checked) {
                chat.innerHTML += `<div class="date-label" style="background:#182229; color:#ffd279;">🔒 Los mensajes están cifrados...</div>`;
            }
        }

        let isFull = false;
        while(lineIdx < rawLines.length && !isFull) {
            let line = applyTone(rawLines[lineIdx], tone);
            min += (lineIdx === 0) ? 0 : Math.floor(Math.random() * 11); // 0 a 10 min aleatorios
            if(min >= 60) { min -= 60; hour = hour % 12 + 1; }
            
            const type = (lineIdx % 2 === 0) ? (startWithMe ? 'sent' : 'received') : (startWithMe ? 'received' : 'sent');
            const timeStr = `${hour}:${min.toString().padStart(2, '0')} ${ampm}`;
            const checks = type === 'sent' ? '<span style="color:#53bdeb">✓✓</span>' : '';

            const msgDiv = document.createElement('div');
            msgDiv.className = `msg ${type}`;
            msgDiv.innerHTML = `${line} <div class="meta-info">${timeStr} ${checks}</div>`;
            
            chat.appendChild(msgDiv);
            if(chat.scrollHeight > 500) { // Límite de la pantalla
                chat.removeChild(msgDiv);
                isFull = true;
            } else {
                lineIdx++;
            }
        }
        gallery.appendChild(phone);
        imgIdx++;
    }
}

function applyTone(text, tone) {
    if(tone === 'amoroso') return text + " ❤️✨";
    if(tone === 'serio') return text.charAt(0).toUpperCase() + text.slice(1) + ".";
    if(tone === 'enojado') return text.toUpperCase() + "!!";
    if(tone === 'indiferente') return text.toLowerCase() + "...";
    return text;
}
