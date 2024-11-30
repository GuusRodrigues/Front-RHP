import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

interface ErroResposta {
  message: string;
}

const FormTransferencia: React.FC = () => {
  const [cpf, setCpf] = useState<string>('');
  const [codigoLeitoOrigem, setCodigoLeitoOrigem] = useState<string>('');
  const [codigoLeitoDestino, setCodigoLeitoDestino] = useState<string>('');
  const [dataHoraTransferencia, setDataHoraTransferencia] = useState<string>('');
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleTransferencia = async () => {
    setMensagem(null);
    setLoading(true);

    const payload = {
      cpf,
      codigo_leito_origem: codigoLeitoOrigem,
      codigo_leito_destino: codigoLeitoDestino,
      datahora_transferencia: dataHoraTransferencia, // Campo único com data e hora
    };

    try {
      const response = await axios.post('/api/transferencia', payload);

      if (response.status === 200 && response.data) {
        setMensagem('Transferência realizada com sucesso!');
        setCpf('');
        setCodigoLeitoOrigem('');
        setCodigoLeitoDestino('');
        setDataHoraTransferencia('');
      } else {
        setMensagem('Não foi possível realizar a transferência. Resposta inválida.');
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErroResposta>;
      if (axiosError.response?.status === 404) {
        setMensagem('CPF do paciente não encontrado. Verifique o número informado.');
      } else if (axiosError.response?.data?.message) {
        setMensagem(axiosError.response.data.message);
      } else {
        setMensagem('Erro ao realizar a transferência. Tente novamente mais tarde.');
      }
      console.error('Erro na transferência:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="form-card">
        <h3>Transferência de Leito</h3>

        <div className="form-group">
          <label>CPF do Paciente</label>
          <input
            type="text"
            placeholder="Digite o CPF do paciente"
            value={cpf}
            onChange={(e) => setCpf(e.target.value.replace(/\D/g, ''))} // Apenas números
            required
          />
        </div>

        <div className="form-group">
          <label>Código do Leito de Origem</label>
          <input
            type="text"
            placeholder="Digite o código do leito de origem"
            value={codigoLeitoOrigem}
            onChange={(e) => setCodigoLeitoOrigem(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Código do Leito de Destino</label>
          <input
            type="text"
            placeholder="Digite o código do leito de destino"
            value={codigoLeitoDestino}
            onChange={(e) => setCodigoLeitoDestino(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Data e Hora da Transferência</label>
          <input
            type="datetime-local"
            value={dataHoraTransferencia}
            onChange={(e) => setDataHoraTransferencia(e.target.value)}
            required
          />
        </div>

        {mensagem && <p className="mensagem">{mensagem}</p>}

        <button onClick={handleTransferencia} disabled={loading}>
          {loading ? 'Confirmando...' : 'Confirmar Transferência'}
        </button>
      </div>
    </div>
  );
};

export default FormTransferencia;
