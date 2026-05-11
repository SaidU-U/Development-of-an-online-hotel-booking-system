const hotels = [
  {
    id: 1,
    name: "Grand Baku Hotel",
    stars: 5,
    city: "Баку",
    price: 205,
    img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=300&h=200&fit=crop",
    desc: "Роскошный отель в самом центре Баку с видом на Каспийское море и первоклассным сервисом."
  },
  {
    id: 2,
    name: "Seaside Inn",
    stars: 4,
    city: "Баку",
    price: 145,
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop",
    desc: "Уютный отель у побережья с панорамным рестораном и собственной террасой."
  },
  {
    id: 3,
    name: "CityView Hotel",
    stars: 3,
    city: "Баку",
    price: 94,
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop",
    desc: "Доступный отель рядом с основными достопримечательностями города."
  },
  {
    id: 4,
    name: "Istanbul Plaza",
    stars: 5,
    city: "Стамбул",
    price: 255,
    img: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=300&h=200&fit=crop",
    desc: "Элегантный отель в историческом центре Стамбула с видом на Босфор."
  },
  {
    id: 5,
    name: "Ottoman Suites",
    stars: 4,
    city: "Стамбул",
    price: 189,
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&h=200&fit=crop",
    desc: "Бутик-отель в османском стиле, расположенный в двух шагах от Гранд-базара."
  },
  {
    id: 6,
    name: "Dubai Palm Resort",
    stars: 4,
    city: "Дубай",
    price: 170,
    img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=300&h=200&fit=crop",
    desc: "Современный курортный отель в Дубае с бассейном на крыше и прямым выходом к пляжу."
  },
  {
    id: 7,
    name: "Moscow Classic",
    stars: 4,
    city: "Москва",
    price: 187,
    img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=300&h=200&fit=crop",
    desc: "Классический отель в Москве с изысканным интерьером и ресторанной кухней."
  },
  {
    id: 8,
    name: "Budget Express Moscow",
    stars: 2,
    city: "Москва",
    price: 51,
    img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=300&h=200&fit=crop",
    desc: "Небольшой отель без лишних удобств — чистые номера и удобное расположение рядом с метро."
  }
];

const hotelPrices = {
  grand: 205,
  seaside: 145,
  cityview: 94,
  plaza: 255,
  ottoman: 189,
  dubai: 170,
  moscow: 187,
  budget: 51
};

document.addEventListener("DOMContentLoaded", function () {
  const today = new Date().toISOString().split("T")[0];
  document.querySelectorAll('input[type="date"]').forEach(inp => {
    inp.setAttribute("min", today);
  });

  if (document.getElementById("hotelsList")) {
    renderHotels(hotels);
  }

  if (document.getElementById("bookingSummary")) {
    ["hotelSelect", "bookCheckIn", "bookCheckOut", "bookGuests"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("change", updateSummary);
    });
  }
});

function renderHotels(list) {
  const container = document.getElementById("hotelsList");
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = '<p style="color:#718096;font-size:15px;">По вашему запросу отели не найдены. Попробуйте изменить фильтры.</p>';
    return;
  }

  container.innerHTML = list.map(h => `
    <div class="hotel-card">
      <img class="hotel-card__img" src="${h.img}" alt="${h.name}" loading="lazy" />
      <div class="hotel-card__body">
        <div class="hotel-card__top">
          <span class="hotel-card__name">${h.name}</span>
          <span class="hotel-card__stars">${"★".repeat(h.stars)}${"☆".repeat(5 - h.stars)}</span>
        </div>
        <div class="hotel-card__location">📍 ${h.city}</div>
        <div class="hotel-card__desc">${h.desc}</div>
        <div class="hotel-card__footer">
          <div class="hotel-card__price">${h.price}₼ <span>/ ночь</span></div>
          <a href="booking.html" class="btn btn--primary">Забронировать</a>
        </div>
      </div>
    </div>
  `).join("");
}

function applyFilters() {
  const minPrice = parseInt(document.getElementById("priceMin").value) || 0;
  const maxPrice = parseInt(document.getElementById("priceMax").value) || 9999;
  const city = document.getElementById("cityFilter").value;
  const checkedStars = [...document.querySelectorAll(".star-cb:checked")].map(cb => parseInt(cb.value));

  const filtered = hotels.filter(h => {
    const priceOk = h.price >= minPrice && h.price <= maxPrice;
    const cityOk = !city || h.city === city;
    const starsOk = checkedStars.length === 0 || checkedStars.includes(h.stars);
    return priceOk && cityOk && starsOk;
  });

  renderHotels(filtered);
}

function resetFilters() {
  document.getElementById("priceMin").value = 0;
  document.getElementById("priceMax").value = 250;
  document.getElementById("cityFilter").value = "";
  document.querySelectorAll(".star-cb").forEach(cb => cb.checked = false);
  renderHotels(hotels);
}

function updateSummary() {
  const hotelKey = document.getElementById("hotelSelect").value;
  const checkIn = document.getElementById("bookCheckIn").value;
  const checkOut = document.getElementById("bookCheckOut").value;
  const guests = document.getElementById("bookGuests").value;

  const sel = document.getElementById("hotelSelect");
  const hotelText = hotelKey ? sel.options[sel.selectedIndex].text.split(" —")[0] : "—";

  document.getElementById("sumHotel").textContent = hotelText;
  document.getElementById("sumGuests").textContent = guests || "—";

  let nights = 0;
  if (checkIn && checkOut && checkOut > checkIn) {
    const msPerDay = 1000 * 60 * 60 * 24;
    nights = Math.round((new Date(checkOut) - new Date(checkIn)) / msPerDay);
  }

  document.getElementById("sumIn").textContent = checkIn ? formatDate(checkIn) : "—";
  document.getElementById("sumOut").textContent = checkOut ? formatDate(checkOut) : "—";
  document.getElementById("sumNights").textContent = nights > 0 ? nights : "—";

  if (hotelKey && nights > 0) {
    const total = (hotelPrices[hotelKey] || 0) * nights;
    document.getElementById("sumTotal").textContent = total + "₼";
  } else {
    document.getElementById("sumTotal").textContent = "—";
  }
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

function submitBooking() {
  let valid = true;

  const fields = [
    { id: "firstName",    errId: "firstNameErr",  label: "Имя"     },
    { id: "lastName",     errId: "lastNameErr",   label: "Фамилия" },
    { id: "email",        errId: "emailErr",      label: "Email",   type: "email" },
    { id: "phone",        errId: "phoneErr",      label: "Телефон" },
    { id: "hotelSelect",  errId: "hotelErr",      label: "Отель"   },
    { id: "bookCheckIn",  errId: "checkInErr",    label: "Заезд"   },
    { id: "bookCheckOut", errId: "checkOutErr",   label: "Выезд"   },
  ];

  fields.forEach(f => {
    const el = document.getElementById(f.id);
    const err = document.getElementById(f.errId);
    err.textContent = "";
    if (!el.value.trim()) {
      err.textContent = `Поле «${f.label}» обязательно для заполнения`;
      valid = false;
    } else if (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) {
      err.textContent = "Введите корректный email";
      valid = false;
    }
  });

  const checkIn = document.getElementById("bookCheckIn").value;
  const checkOut = document.getElementById("bookCheckOut").value;
  if (checkIn && checkOut && checkIn >= checkOut) {
    document.getElementById("checkOutErr").textContent = "Дата выезда должна быть позже даты заезда";
    valid = false;
  }

  if (!valid) return;

  const name = document.getElementById("firstName").value + " " + document.getElementById("lastName").value;
  const sel = document.getElementById("hotelSelect");
  const hotelName = sel.options[sel.selectedIndex].text.split(" —")[0];
  document.getElementById("modalText").textContent =
    `${name}, ваше бронирование в «${hotelName}» с ${formatDate(checkIn)} по ${formatDate(checkOut)} успешно оформлено. Подтверждение будет отправлено на вашу почту.`;

  document.getElementById("confirmModal").classList.add("active");
}

function closeModal() {
  document.getElementById("confirmModal").classList.remove("active");
  window.location.href = "index.html";
}

function sendContact() {
  let valid = true;

  const name = document.getElementById("contactName");
  const email = document.getElementById("contactEmail");
  const msg = document.getElementById("contactMessage");

  ["contactNameErr", "contactEmailErr", "contactMessageErr"].forEach(id => {
    document.getElementById(id).textContent = "";
  });

  if (!name.value.trim()) {
    document.getElementById("contactNameErr").textContent = "Введите имя"; valid = false;
  }
  if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    document.getElementById("contactEmailErr").textContent = "Введите корректный email"; valid = false;
  }
  if (!msg.value.trim()) {
    document.getElementById("contactMessageErr").textContent = "Введите сообщение"; valid = false;
  }

  if (!valid) return;

  document.getElementById("contactSuccess").style.display = "block";
  name.value = ""; email.value = ""; msg.value = "";
}
