import React, { useState } from 'react';
import axios from 'axios';

const FormCadastroPaciente: React.FC = () => {
  const [codigoProntuario, setCodigoProntuario] = useState<string>('');
  const [name, setNome] = useState<string>('');
  const [dob, setDataNascimento] = useState<string>('');
  const [sexo, setSexo] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [nomeMae, setNomeMae] = useState<string>('');
  const [nomePai, setNomePai] = useState<string>('');
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCadastrar = async () => {
    setMensagem(null); // Resetando mensagem
    setLoading(true); // Indicando que a requisição está em andamento

    const novoPaciente = {
      codigoProntuario,
      name,
      dob,
      sexo,
      cpf,
      nomeMae,
      nomePai,
    };

    try {
      // Fazendo a requisição POST para a API
      const response = await axios.post('http://localhost:3000/patients', novoPaciente);

      // Verificando se a resposta foi bem-sucedida
      if (response.status === 200) {
        setMensagem('Paciente cadastrado com sucesso!');
      } else {
        setMensagem('Ocorreu um erro ao cadastrar o paciente.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar paciente:', error);
      setMensagem('Erro ao conectar com a API. Tente novamente mais tarde.');
    } finally {
      setLoading(false); // Finalizando o estado de carregamento
    }
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
            value={name}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Data de Nascimento</label>
          <input
            type="date"
            value={dob}
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

        {/* Exibindo mensagem de erro ou sucesso */}
        {mensagem && <p className="mensagem">{mensagem}</p>}

        {/* Botão de cadastro */}
        <button onClick={handleCadastrar} disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </div>
    </div>
  );
};

export default FormCadastroPaciente;
