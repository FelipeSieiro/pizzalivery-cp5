import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { routes } from "../../routes";
import OrderContext from "../../contexts/OrderContext";
import { Title } from "../../components/title/Title";
import { convertToCurrency } from "../../helpers/convertToCurrency";
import {
  SummaryActionWrapper,
  SummaryAmount,
  SummaryContentWrapper,
  SummaryDescription,
  SummaryDetails,
  SummaryImage,
  SummaryPrice,
  SummaryTitle,
} from "./Summary.style";
import { Button } from "../../components/button/Button";

export default function Summary() {
  const navigate = useNavigate();
  const { pizzaSize, pizzaFlavour, addPizzaToOrder } = useContext(OrderContext); // Use 'addPizzaToOrder' from context
  const [summaryData, setSummaryData] = useState([]);
  const [summaryAmount, setSummaryAmount] = useState(0);

  const handleBack = () => {
    navigate(routes.pizzaFlavour);
  }

  const handleNext = () => {
    const payload = pizzaFlavour.map((flavour) => ({
      item: {
        name: flavour.name, 
        image: flavour.image,
        size: pizzaSize[0].text, 
        slices: pizzaSize[0].slices,
        value: flavour.price[pizzaSize[0].slices],
      },
      total: flavour.price[pizzaSize[0].slices],
    }));

    addPizzaToOrder(payload);
    navigate(routes.checkout);
  }
  
  const handleNewItems = () => {
    navigate(routes.pizzaSize);
  }

  useEffect(() => {
    if (!pizzaFlavour || !pizzaFlavour.length) { 
      return navigate(routes.pizzaSize);
    }

    if (!pizzaSize || !pizzaSize.length) { 
      return navigate(routes.home);
    }

    const summaryData = pizzaFlavour.map((flavour) => ({
      text: pizzaSize[0].text,
      slices: pizzaSize[0].slices,
      name: flavour.name,
      price: flavour.price[pizzaSize[0].slices],
      image: flavour.image,
    }));

    setSummaryData(summaryData);
  }, [pizzaFlavour, pizzaSize]);

  useEffect(() => {
    const totalAmount = summaryData.reduce(
      (total, flavour) => total + flavour.price/2,
      0
    );

    setSummaryAmount(totalAmount);
  }, [summaryData]);

  return (
    <Layout>
      <Title tabIndex={0}>Resumo do pedido</Title>
      <SummaryContentWrapper>
        {summaryData.map((item, index) => (
          <SummaryDetails key={index}>
            <SummaryImage src={item.image} alt="" />
            <SummaryTitle>{item.name}</SummaryTitle>
            <SummaryDescription>
              {item.text} ({item.slices} pedaços)
            </SummaryDescription>
            <SummaryPrice>{convertToCurrency(item.price)}</SummaryPrice>
          </SummaryDetails>
        ))}
        <SummaryAmount>
          <SummaryPrice>{convertToCurrency(summaryAmount)}</SummaryPrice>
        </SummaryAmount>
      </SummaryContentWrapper>
      <SummaryActionWrapper>
        <Button inverse="inverse" onClick={handleBack}>
          Voltar
        </Button>
        <Button inverse="newItems" onClick={handleNewItems}>
          Adicionar Mais Itens
        </Button>
        <Button onClick={handleNext}>Ir para o pagamento</Button>
      </SummaryActionWrapper>
    </Layout>
  );
}
