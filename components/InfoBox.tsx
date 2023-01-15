export const InfoBox: React.FC = () => {
  return (
    <div className="mt-8 w-full justify-center">
      <p className="text-center text-gray-500">
        Tämä sivusto käyttää Fölin avointa dataa.{" "}
        <a
          href="https://data.foli.fi/doc/index"
          className="text-cyan-500 hover:underline"
          target={"_blank"}
        >
          Lisätietoja
        </a>
      </p>
    </div>
  );
};
