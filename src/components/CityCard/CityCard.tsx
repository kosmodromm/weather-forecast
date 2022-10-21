interface IProps {
  city: string;
  iconCode: string;
}

const CityCard = ({ city, iconCode }: IProps) => {
  return (
    <div className="flex justify-center">
      <div className="rounded-lg shadow-lg bg-transparent backdrop-blur-sm max-w-sm">
        {/*todo make navigation to city page with router*/}
        <a href="#!">
          <img className="rounded-t-lg" src={iconCode} alt="" />
        </a>
        <div className="p-6">
          <h5 className="text-gray-900 text-xl font-medium mb-2">{city}</h5>
          <p className="text-gray-700 text-base mb-4">
            Some quick example text to build on the card title and make up the bulk of the card's
            content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CityCard;
