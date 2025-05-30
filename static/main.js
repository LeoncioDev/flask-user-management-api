// Controle das abas
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(btn => btn.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// Tema escuro/claro
const toggleBtn = document.getElementById('toggle-theme');
const body = document.body;

function setTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark-mode');
    toggleBtn.textContent = 'Modo Claro';
  } else {
    body.classList.remove('dark-mode');
    toggleBtn.textContent = 'Modo Escuro';
  }
  localStorage.setItem('theme', theme);
}

toggleBtn.addEventListener('click', () => {
  if (body.classList.contains('dark-mode')) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
});

const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// Formulário
const form = document.getElementById('employee-form');
const message = document.getElementById('form-message');
const userList = document.getElementById('user-list');
const editingIdInput = document.getElementById('editing-id');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: form.name.value,
    email: form.email.value,
    function: form.function.value,
    department: form.department.value,
    start_date: form.start_date.value,
    phone: form.phone.value  // Corrigido com a vírgula faltante
  };

  const editingId = editingIdInput.value;

  try {
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/users/${editingId}` : '/users';

    const response = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      message.textContent = editingId ? 'Funcionário atualizado!' : 'Funcionário cadastrado!';
      message.style.color = 'green';
      form.reset();
      editingIdInput.value = '';

      // Recarrega a página para simplificar a atualização da lista
      location.reload();
    } else {
      const res = await response.json();
      message.textContent = `Erro: ${res.message || 'Não foi possível processar.'}`;
      message.style.color = 'red';
    }
  } catch (error) {
    message.textContent = 'Erro na conexão com o servidor.';
    message.style.color = 'red';
  }
});

// Lógica de editar
document.querySelectorAll('.edit-btn').forEach(button => {
  button.addEventListener('click', () => {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    editingIdInput.value = button.dataset.id;
    form.name.value = cells[1].textContent;
    form.email.value = cells[2].textContent;
    form.function.value = cells[3].textContent;
    form.department.value = cells[4].textContent;
    form.start_date.value = cells[5].textContent;
    form.phone.value = cells[6].textContent;  // Preenche o telefone no formulário

    document.querySelector('[data-tab="form"]').click(); // Abre a aba do formulário
  });
});

// Lógica de deletar
document.querySelectorAll('.delete-btn').forEach(button => {
  button.addEventListener('click', async () => {
    const userId = button.dataset.id;
    const confirmDelete = confirm('Tem certeza que deseja excluir este funcionário?');

    if (!confirmDelete) return;

    try {
      const response = await fetch(`/users/${userId}`, { method: 'DELETE' });

      if (response.ok) {
        button.closest('tr').remove();
        alert('Funcionário excluído com sucesso!');
      } else {
        alert('Erro ao excluir funcionário.');
      }
    } catch (error) {
      alert('Erro na conexão com o servidor.');
    }
  });
});
