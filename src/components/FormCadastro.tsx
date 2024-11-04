import React, { useState } from 'react';

const FormCadastroPaciente: React.FC = () => {
  const [codigoProntuario, setCodigoProntuario] = useState<string>('');
  const [nome, setNome] = useState<string>('');
  const [dataNascimento, setDataNascimento] = useState<string>('');
  const [sexo, setSexo] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [nomeMae, setNomeMae] = useState<string>('');
  const [nomePai, setNomePai] = useState<string>('');

  const handleCadastrar = () => {
    alert(`Cadastrando paciente: ${nome}`);
    // Aqui, você pode adicionar lógica para envio dos dados para o backend
  };

  return (
    <div className="main-content">
      <div className="form-card">
        <h3>Cadastro de Paciente</h3>
        
        <div className="form-group">
          <label>Código do Prontuário</label>
          <input
            type="text"
            placeholder="Digite o código do prontuário"
            value={codigoProntuario}
            onChange={(e) => setCodigoProntuario(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Nome do Paciente</label>
          <input
            type="text"
            placeholder="Digite o nome do paciente"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Data de Nascimento</label>
          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Sexo</label>
          <select
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="outro">Outro</option>
          </select>
        </div>

        <div className="form-group">
          <label>CPF</label>
          <input
            type="text"
            placeholder="Digite o CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Nome da Mãe</label>
          <input
            type="text"
            placeholder="Digite o nome da mãe"
            value={nomeMae}
            onChange={(e) => setNomeMae(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Nome do Pai (opcional)</label>
          <input
            type="text"
            placeholder="Digite o nome do pai"
            value={nomePai}
            onChange={(e) => setNomePai(e.target.value)}
          />
        </div>

        <button onClick={handleCadastrar}>Cadastrar</button>
      </div>
    </div>
  );
};

export default FormCadastroPaciente;
