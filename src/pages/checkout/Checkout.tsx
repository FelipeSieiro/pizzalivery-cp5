import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/layout/Layout';
import { Title } from '../../components/title/Title';
import OrderContext from '../../contexts/OrderContext';
import { Button } from '../../components/button/Button';
import { convertToCurrency } from '../../helpers/convertToCurrency';
import {
  CheckoutAction,
  CheckoutItem,
  CheckoutItemFlex,
  PaymentMethodGroup,
} from './Checkout.style';

export default function Checkout() {
  const { pizzaOrder } = useContext(OrderContext);
  const navigate = useNavigate();

  const paymentOptions = [
    { id: '20', value: 1, text: 'Cartão de crédito' },
    { id: '21', value: 2, text: 'Cartão de débito' },
    { id: '22', value: 3, text: 'Vale refeição' },
    { id: '23', value: 4, text: 'PIX' },
  ];

  const [paymentType, setPaymentType] = useState('');

  const handleChange = (event) => {
    setPaymentType(event.target.value);
  };

  const getPaymentOptionType = (paymentType) => {
    if (!paymentType) return '';
    const filteredValue = paymentOptions.find((payment) => payment.value === paymentType);
    return filteredValue ? filteredValue.text : '';
  };

  const handleClick = () => {
    alert('Pedido feito');
  };

  useEffect(() => {
    if (!pizzaOrder || pizzaOrder.length === 0) {
      navigate('/pizzaSize'); 
    }
  }, [pizzaOrder, navigate]);

  return (
    <Layout>
      <Title tabIndex={0}>Pagamento</Title>
      {pizzaOrder.map((item, index) => (
        <CheckoutItem key={index}>
          <h2>Item {index + 1}</h2>
          <CheckoutItemFlex>
            <p>{item.name}</p>
            <p>{convertToCurrency(item.value)}</p>
          </CheckoutItemFlex>
        </CheckoutItem>
      ))}
      <CheckoutItem>
        <h2>Forma de pagamento</h2>
        <CheckoutItemFlex>
          <PaymentMethodGroup>
            <label htmlFor="payments">Selecione a forma de pagamento</label>
            <select
              name="payments"
              id="payments"
              value={paymentType}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              {paymentOptions.map(({ id, value, text }) => (
                <option key={id} value={value}>
                  {text}
                </option>
              ))}
            </select>
          </PaymentMethodGroup>
          <p>{getPaymentOptionType(Number(paymentType))}</p>
        </CheckoutItemFlex>
      </CheckoutItem>
      <CheckoutItem>
        <CheckoutItemFlex>
          <h2>Total do pedido</h2>
          <p>
            {convertToCurrency(
              pizzaOrder.reduce((total, item) => total + item.value, 0)
            )}
          </p>
        </CheckoutItemFlex>
      </CheckoutItem>
      <CheckoutAction>
        <Button onClick={handleClick} disabled={!Boolean(paymentType)}>
          Fazer pedido
        </Button>
      </CheckoutAction>
    </Layout>
  );
}
