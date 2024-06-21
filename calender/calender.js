let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();
let events = {};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('yearInput').value = currentYear;
    document.getElementById('monthInput').value = currentMonth + 1;
    generateCalendar();
    setupEventForm();
});

function generateCalendar() {
    const year = parseInt(document.getElementById('yearInput').value);
    const month = parseInt(document.getElementById('monthInput').value) - 1;

    if (isNaN(year) || isNaN(month) || month < 0 || month > 11) {
        alert('Please enter a valid year and month.');
        return;
    }

    currentYear = year;
    currentMonth = month;

    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';

    const date = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = date.getDay();

    const monthYearText = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    document.getElementById('monthYear').textContent = monthYearText;

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
        const dayCell = document.createElement('div');
        dayCell.textContent = day;
        calendar.appendChild(dayCell);
    });

    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        calendar.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement('div');
        cell.textContent = day;
        cell.addEventListener('click', () => openEventForm(year, month, day));

        const today = new Date();
        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
            cell.classList.add('today');
        }

        const dateString = `${year}-${month + 1}-${day}`;
        if (events[dateString]) {
            const eventDiv = document.createElement('div');
            eventDiv.classList.add('event');
            eventDiv.textContent = events[dateString];
            cell.appendChild(eventDiv);
        }

        calendar.appendChild(cell);
    }

    highlightHolidays(year, month, holidays);
}

function changeMonth(offset) {
    currentMonth += offset;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear -= 1;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear += 1;
    }
    document.getElementById('yearInput').value = currentYear;
    document.getElementById('monthInput').value = currentMonth + 1;
    generateCalendar();
}

const holidays = [
    { day: 25, name: "Christmas Day" }
];

function highlightHolidays(year, month, holidays) {
    const calendar = document.getElementById('calendar');
    const cells = calendar.getElementsByTagName('div');
    holidays.forEach(holiday => {
        const holidayDate = new Date(year, month, holiday.day);
        const dayIndex = holidayDate.getDay() + holiday.day + 6;
        if (cells[dayIndex]) {
            cells[dayIndex].classList.add('holiday');
            cells[dayIndex].setAttribute('title', holiday.name);
        }
    });
}

function openEventForm(year, month, day) {
    const eventForm = document.getElementById('eventForm');
    const eventDate = document.getElementById('eventDate');
    const eventDescription = document.getElementById('eventDescription');

    eventDate.value = `${year}-${month + 1}-${day}`;
    eventDescription.value = '';

    eventForm.style.display = 'flex';
}

function setupEventForm() {
    const eventForm = document.getElementById('eventForm');
    const closeButton = document.querySelector('.close');

    closeButton.addEventListener('click', () => {
        eventForm.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === eventForm) {
            eventForm.style.display = 'none';
        }
    });
}

function addEvent() {
    const eventDate = document.getElementById('eventDate').value;
    const eventDescription = document.getElementById('eventDescription').value;

    if (!eventDescription) {
        alert('Please enter an event description.');
        return;
    }

    events[eventDate] = eventDescription;
    document.getElementById('eventForm').style.display = 'none';
    generateCalendar();
}
