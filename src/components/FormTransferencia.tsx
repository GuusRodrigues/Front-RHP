import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

interface ErroResposta {
  message: string;
}

const FormTransferencia: React.FC = () => {
  const [cpf, setCpf] = useState<string>('');
  const [codigoLeitoAtual, setCodigoLeitoAtual] = useState<string>('');
  const [codigoUnidade, setCodigoUnidade] = useState<string>('');
  const [codigoLeitoDestino, setCodigoLeitoDestino] = useState<string>('');
  const [dataTransferencia, setDataTransferencia] = useState<string>('');
  const [horaTransferencia, setHoraTransferencia] = useState<string>('');
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const formatarDataBr = (dataISO: string): string => {
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const formatarHoraBr = (horaISO: string): string => {
    return horaISO.slice(0, 5); 
  };

  useEffect(() => {
    const now = new Date();
    const date = now.toISOString().split('T')[0]; 
    const time = now.toTimeString().split(' ')[0]; 

    setDataTransferencia(formatarDataBr(date)); 
    setHoraTransferencia(formatarHoraBr(time)); 
  }, []);

  const handleTransferencia = async () => {
    setMensagem(null); 
    setLoading(true);

    const payload = {
      cpf,
      codigoLeitoAtual,
      codigoUnidade,
      codigoLeitoDestino,
      dataTransferencia: dataTransferencia.split('/').reverse().join('-'), // Converte de DD/MM/AAAA para AAAA-MM-DD para envio à API
      horaTransferencia,
    };

    try {
      const response = await axios.post('/api/transferencia', payload);

      // Verifica se a resposta é nula ou não possui dados esperados
      if (response.status === 200 && response.data) {
        setMensagem('Transferência realizada com sucesso!');
      } else {
        setMensagem('Não foi possível realizar a transferência. Resposta inválida.');
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErroResposta>;

      // Verificação para erros específicos da API
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
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Código do Leito Atual</label>
          <input
            type="text"
            placeholder="Digite o código do leito atual"
            value={codigoLeitoAtual}
            onChange={(e) => setCodigoLeitoAtual(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Código da Unidade</label>
          <input
            type="text"
            placeholder="Digite o código da unidade"
            value={codigoUnidade}
            onChange={(e) => setCodigoUnidade(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Código do Leito Destino</label>
          <input
            type="text"
            placeholder="Digite o código do leito destino"
            value={codigoLeitoDestino}
            onChange={(e) => setCodigoLeitoDestino(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Data da Transferência</label>
          <input
            type="date"
            value={dataTransferencia.split('/').reverse().join('-')} 
            onChange={(e) => setDataTransferencia(formatarDataBr(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label>Hora da Transferência</label>
          <input
            type="time"
            value={horaTransferencia}
            onChange={(e) => setHoraTransferencia(formatarHoraBr(e.target.value))}
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
