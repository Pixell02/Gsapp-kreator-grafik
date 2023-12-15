import Title from '../../../components/main-content-elements/Title';
import './Description.css';

import ReactPlayer from 'react-player';
export default function Description() {
  return (
    <>
      <div className="chapter-container mt-5 mb-5">
        <div className="chapter-number">
          <div className="d-flex flex-column chapter-content">
            <Title title="1. Panel twojej drużyny" />
            <span>
              W panelu twojej drużyny znajduje się przycisk z napisem twoje logo, kliknij go, a następnie wypełnij
              wszystkie pola, aby dodać herb drużyny, nazwę oraz wybrać dyscyplinę sportową. Po kliknięciu przycisku
              dodaj, ukaże ci się okienko z nazwą twojej drużyny oraz herb.
            </span>
          </div>
        </div>
        <div className="video-container">
          <ReactPlayer
            className="video"
            url="https://firebasestorage.googleapis.com/v0/b/poster-dd714.appspot.com/o/video%2Fczesc_1.mp4?alt=media&token=7bb18482-4016-4917-bce4-0ef1e63f6b5f"
            playing={true}
            controls={false}
            loop={true}
          />
        </div>
      </div>
      <div className="chapter-container mt-5 mb-5 ">
        <div className="video-container ml-5 ">
          <ReactPlayer
            className="video"
            url="https://firebasestorage.googleapis.com/v0/b/poster-dd714.appspot.com/o/video%2F2.mp4?alt=media&token=a48282d9-bb1c-429d-8753-698899e50d66"
            playing={true}
            controls={false}
            loop={true}
          />
        </div>
        <div className="chapter-number mt-5 mb-5">
          <div className="d-flex flex-column chapter-content">
            <Title title="2. Zawodnicy" />
            <span>
              Po lewej stronie znajduje się pasek z zakładkami, w celu przeniesienia się do zakładki z zawodnikami
              kliknij czwartą opcję. Po wykonaniu tej czynności kliknij przycisk dodaj zawodnika i wypełnij obowiązkowe
              pola, czyli imię, nazwisko oraz numer zawodnika, opcja dodaj zdjęcię jest nieobowiązkowa. Po kliknięciu
              przycisku dodaj ukaże ci się okienko z twoim zawodnikiem
            </span>
          </div>
        </div>
      </div>
      <div className="chapter-container mt-5 mb-5">
        <div className="chapter-number">
          <div className="d-flex flex-column">
            <Title title="3. Przeciwnicy" />
            <span>
              Aby przenieść się do zakładki przeciwnicy kliknij piątą opcję. Po kliknięciu pokaże ci się tytuł zakładki
              oraz przycisk dodaj przeciwnika, w celu dodania przeciwnika kliknij ten przycisk, a następnie wypełnij
              wszystkie pola. Po kliknięciu przycisku dodaj pokaże ci się nazwa oraz herb przeciwnika.
            </span>
          </div>
        </div>
        <div className="video-container ml-5">
          <ReactPlayer
            className="video"
            url="https://firebasestorage.googleapis.com/v0/b/poster-dd714.appspot.com/o/video%2F3.mp4?alt=media&token=dd572468-83b8-4b36-b485-2e7e14d4f9da"
            playing={true}
            controls={false}
            loop={true}
          />
        </div>
      </div>
      <div className="chapter-container mt-5 mb-5">
        <div className="video-container ml-5">
          <ReactPlayer
            className="video"
            url="https://firebasestorage.googleapis.com/v0/b/poster-dd714.appspot.com/o/video%2F4.mp4?alt=media&token=cd1a720a-64a8-4cdb-adbf-1ebbd62a8077"
            playing={true}
            controls={false}
            loop={true}
          />
        </div>
        <div className="chapter-number mt-5 mb-5">
          <div className="d-flex flex-column">
            <Title title="4. Licencja / Usługi" />
            <span>
              Aby kupić pełną licencję do aplikacji, bądź usługi graficzne, kliknij siódmą opcję w celu przejścia do
              zakładki kupna dostępu. Po kliknięciu ukażą ci się opcje wyboru oraz formularz. Pierwsza z opcji umożliwia
              kupno pełnej licencji na okres jednego miesiąca. Druga z opcji umożliwia kupno oferowanych usług. Po
              dokonaniu zakupu indywidualnych wzorów, zostaną one zaprojekowane oraz dodane do twojego katalogu. Po
              dokonaniu zakupu usług wycinania herbu, bądź zawodników, zostaną pobrane obrazy z twojego profilu
              użytkownika, a następnie edytowane i zamienione.
            </span>
          </div>
        </div>
      </div>
      <div className="chapter-container mt-5 mb-5">
        <div className="chapter-number">
          <div className="d-flex flex-column">
            <Title title="5. Profil uzytkownika" />
            <span>
              Aby przejść do twojego profilu kliknij przedostatną zakładkę. Znajduje tam się domyślnie, twoje Id,
              e-mail, rodzaj licencji oraz formularz. Fomularz został umieszczony w celu zapisania danych do
              późniejszego automatycznego wypełnienia pól formularza kupna licencji, bądź usług.
            </span>
          </div>
        </div>
        <div className="video-container ml-5">
          <ReactPlayer
            className="video"
            url="https://firebasestorage.googleapis.com/v0/b/poster-dd714.appspot.com/o/video%2F5.mp4?alt=media&token=6c88fad2-df12-44d2-a003-abef4565bacb"
            playing={true}
            controls={false}
            loop={true}
          />
        </div>
      </div>
      <div className="chapter-container mt-5 mb-5">
        <div className="video-container ml-5">
          <ReactPlayer
            className="video"
            url="https://firebasestorage.googleapis.com/v0/b/poster-dd714.appspot.com/o/video%2F6.mp4?alt=media&token=e41db8e7-971d-4041-a8fe-ab3dc37c9ed9"
            playing={true}
            controls={false}
            loop={true}
          />
        </div>
        <div className="chapter-number">
          <div className="d-flex flex-column">
            <Title title="6. Twój katalog" />

            <span>
              Aby przenieść się do twojego katalogu, kliknij drugą opcję. Po przejściu do tej zakładki, ukażą ci się
              między innymi indywidualne wzory graficzne zamówione przez ciebie.
            </span>
          </div>
        </div>
      </div>
      <div className="chapter-container">
        <div className="chapter-number">
          <div className="d-flex flex-column">
            <Title title="7. Katalog" />

            <span>
              Aby przenieść się do katalogu, kliknij pierwszą opcję, pokażą ci się tam gotowe motywy do wyboru. W celu
              przejścia do obszaru roboczego, kliknij jeden z nich. Pokaże ci się grafika oraz pola, które umożliwią ci
              dodanie napisów oraz herbu przeciwnika. herb twojej drużyny, pokaże ci się w raz z wybraniem grafiki. Aby
              zapisać edytowaną grafikę kliknij przycisk zapisz,
            </span>
          </div>
        </div>
        <div className="video-container ml-5">
          <ReactPlayer
            className="video"
            url="https://firebasestorage.googleapis.com/v0/b/poster-dd714.appspot.com/o/video%2F7.mp4?alt=media&token=8b2efd3b-49c3-4b93-a077-fa51f9039950"
            playing={true}
            controls={false}
            loop={true}
          />
        </div>
      </div>
    </>
  );
}
