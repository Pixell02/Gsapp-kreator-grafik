import Container from "../../components/Container";
import LeftBar from "../../components/Left-Bar";
import Footer from "../../components/MainFooter";
import MainYourCatalog from "./components/MainYourCatalog";
export default function YourCatalog() {
  return (
    <Container>
      <LeftBar />
      <MainYourCatalog />
      <Footer />
    </Container>
  );
}
