const STORAGE_KEY = "feedback-form-state";
const form = document.querySelector(".feedback-form");

// 1. Початковий стан об'єкта
let formData = { email: "", message: "" };

// 2. Перевірка сховища при завантаженні
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  formData = JSON.parse(savedData);
  form.elements.email.value = formData.email || "";
  form.elements.message.value = formData.message || "";
}

// 3. Відстеження змін (делегування на подію input)
form.addEventListener("input", (event) => {
  const { name, value } = event.target;
  
  // Оновлюємо formData, видаляючи пробіли по краях
  formData[name] = value.trim();
  
  // Зберігаємо актуальний об'єкт у localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// 4. Обробка відправлення форми
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Перевірка на пусті поля
  if (!formData.email || !formData.message) {
    alert("Fill please all fields");
    return;
  }

  // Вивід у консоль
  console.log("Submitted Data:", formData);

  // Очищення всього
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: "", message: "" };
  form.reset();
});