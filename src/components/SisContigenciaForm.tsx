import React, { useState } from 'react';

function MainContent() {
  const [cpf, setCpf] = useState('');

  const handleConsultar = () => {
    alert(`Consultando CPF: ${cpf}`);
  };

  return (
    <div className="main-content">
      <div className="consulta-card">
        <h3>Consulta de Paciente</h3>
        <div className="form-group">
          <label>CPF</label>
          <input
            type="text"
            placeholder="Digite o CPF aqui"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </div>
        <button onClick={handleConsultar}>Consultar</button>
      </div>
    </div>
  );
}

export default MainContent;