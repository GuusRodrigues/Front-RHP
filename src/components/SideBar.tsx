import React from 'react';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h3>Gestão do Paciente</h3>
        <ul>
          <li>Consulta de Paciente</li>
          <li>Cadastro de Paciente</li>
          <li>Alta Hospitalar</li>
          <li>Transferência de Leito</li>
        </ul>
      </div>
      <div className="sidebar-section">
        <h3>Outros</h3>
        <ul>
          <li>Configuração</li>
          <li style={{ color: 'red' }}>Sair</li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;