import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

const FormCadastroPaciente: React.FC = () => {
  const [name, setNome] = useState<string>('');
  const [dob, setDataNascimento] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [nomeMae, setNomeMae] = useState<string>('');
  const [endereco, setEndereco] = useState<string>('');
  const [cep, setCep] = useState<string>('');
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Validação básica do CPF
  const validarCPF = (cpf: string) => {
    return /^\d{11}$/.test(cpf); // Verifica se o CPF tem exatamente 11 dígitos numéricos
  };

  // Validação do CEP
  const validarCEP = (cep: string) => {
    return /^\d{8}$/.test(cep); // Verifica se o CEP tem exatamente 8 dígitos numéricos
  };

  // Função para verificar se o CPF já existe
  const verificarCPFExistente = async (): Promise<boolean> => {
    try {
      const response = await axios.get(`http://localhost:3000/patients/${cpf}`);
      if (response?.data) {
        // CPF encontrado
        setMensagem('Este CPF já está cadastrado.');
        return true;
      }
      return false;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        // CPF não encontrado, pode continuar
        return false;
      } else {
        setMensagem('Erro ao verificar CPF. Tente novamente.');
        return false; // Retorna falso para continuar o cadastro
      }
    }
  };

  const handleCadastrar = async () => {
    setMensagem(null);
    setLoading(true);

    if (!validarCPF(cpf)) {
      setMensagem('CPF inválido. Insira um CPF com 11 dígitos numéricos.');
      setLoading(false);
      return;
    }

    if (!validarCEP(cep)) {
      setMensagem('CEP inválido. Insira um CEP com 8 dígitos numéricos.');
      setLoading(false);
      return;
    }

    try {
      const cpfExistente = await verificarCPFExistente();
      if (cpfExistente) {
        setLoading(false);
        return;
      }

      const novoPaciente = {
        name,
        dob,
        cpf,
        nomeMae,
        endereco,
        cep,
      };

      const response = await axios.post('http://localhost:3000/patients', novoPaciente);
      
      // Tratamento para garantir que a resposta seja válida
      if (response?.status === 201 && response?.data) {
        setMensagem('Paciente cadastrado com sucesso!');
        setNome('');
        setDataNascimento('');
        setCpf('');
        setNomeMae('');
        setCep('');
        setEndereco('');
      } else {
        setMensagem('Falha no cadastro do paciente. Tente novamente.');
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      // Tratamento para falhas na conexão ou resposta inesperada
      if (axiosError.response?.data?.message) {
        setMensagem(axiosError.response?.data?.message);
      } else {
        setMensagem('Erro ao conectar com a API. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="form-card">
        <h3>Cadastro de Paciente</h3>

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
          <label>CEP</label>
          <input
            type="text"
            placeholder="Digite o CEP do paciente"
            value={cep}
            onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))} // Permite apenas números
            maxLength={8}
            required
          />
        </div>

        <div className="form-group">
          <label>Endereço</label>
          <input
            type="text"
            placeholder="Digite o endereço do paciente"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
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
