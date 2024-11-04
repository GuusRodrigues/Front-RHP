import React, { useState } from 'react';

const FormConsulta: React.FC = () => {
  const [cpf, setCpf] = useState<string>('');

  const handleConsultar = () => {
    alert(`Consultando CPF: ${cpf}`);
  };

  return (
    <div className="main-content">
      <div className="form-card">
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
};

export default FormConsulta;
