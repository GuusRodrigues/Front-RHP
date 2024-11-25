import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

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

  // Validação básica do CPF
  const validarCPF = (cpf: string) => {
    return /^\d{11}$/.test(cpf); // Verifica se o CPF tem exatamente 11 dígitos numéricos
  };

  const handleCadastrar = async () => {
    setMensagem(null);
    setLoading(true);

    if (!validarCPF(cpf)) {
      setMensagem('CPF inválido. Insira um CPF com 11 dígitos numéricos.');
      setLoading(false);
      return;
    }

    const novoPaciente = {
      codigoProntuario,
      name,
      dob,
      sexo,
      cpf,
      nomeMae,
      nomePai: nomePai || null, // Permite campo opcional
    };

    try {
      const response = await axios.post('http://localhost:3000/patients', novoPaciente);

      if (response.status === 201) { // Alterado para o status 201 (Created)
        setMensagem('Paciente cadastrado com sucesso!');
        // Limpar o formulário após cadastro
        setCodigoProntuario('');
        setNome('');
        setDataNascimento('');
        setSexo('');
        setCpf('');
        setNomeMae('');
        setNomePai('');
      } else {
        setMensagem('Ocorreu um erro ao cadastrar o paciente.');
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      setMensagem(axiosError.response?.data?.message || 'Erro ao conectar com a API. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
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
          <select value={sexo} onChange={(e) => setSexo(e.target.value)} required>
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
            onChange={(e) => setCpf(e.target.value.replace(/\D/g, ''))} // Permite apenas números
            maxLength={11}
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

        {mensagem && <p className={`mensagem ${loading ? 'loading' : ''}`}>{mensagem}</p>}

        <button onClick={handleCadastrar} disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </div>
    </div>
  );
};

export default FormCadastroPaciente;
