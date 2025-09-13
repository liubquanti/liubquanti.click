const BASE_TIME = 1130392800; // базова дата

function formatChrono(seconds) {
    const s = seconds % 60;
    const m = Math.floor(seconds / 60) % 60;
    const h = Math.floor(seconds / 3600) % 24;

    let now = new Date(0);
    let end = new Date(seconds * 1000);

    let years = end.getUTCFullYear() - now.getUTCFullYear();
    let months = end.getUTCMonth() - now.getUTCMonth();
    let days = end.getUTCDate() - now.getUTCDate();

    if (days < 0) {
        months -= 1;
        const prevMonth = new Date(end.getUTCFullYear(), end.getUTCMonth(), 0);
        days += prevMonth.getDate();
    }
    if (months < 0) {
        years -= 1;
        months += 12;
    }

    return `${years} років ${months} міс. ${days} дн. ` +
           `${String(h).padStart(2,'0')}:` +
           `${String(m).padStart(2,'0')}:` +
           `${String(s).padStart(2,'0')}`;
}

function updateChronometers() {
    const now = Math.floor(Date.now() / 1000);

    document.querySelectorAll('.chronometer').forEach(el => {
        const start = parseInt(el.dataset.timestamp, 10);
        const stop = el.dataset.timestop ? parseInt(el.dataset.timestop, 10) : null;
        const isMain = el.dataset.timemain === "true";

        let endTime = now;
        if (stop && now > stop) {
            endTime = stop;
        }

        let diff = endTime - start;
        if (diff < 0) diff = 0;

        // Вивід часу
        el.querySelector('.chronometer-time').textContent = formatChrono(diff);

        // Відсотки (якщо не головний)
        const percentEl = el.querySelector('.chronometer-percent');
        if (!isMain && percentEl) {
            const baseDiff = now - BASE_TIME;
            let percent = 0;
            if (baseDiff > 0) {
                percent = (diff / baseDiff) * 100;
            }
            percentEl.textContent = ` (${percent.toFixed(2)}%)`;
        } else if (percentEl) {
            percentEl.textContent = "";
        }
    });
}

updateChronometers();
setInterval(updateChronometers, 1000);