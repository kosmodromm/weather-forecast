interface IProps {
  error: string;
}

const ErrorInformator: React.FC<IProps> = ({error}) => {
  return (
    <div>
      <p className="text-gray-800 pt-10 text-xl">
        {error}
      </p>
    </div>
  )
}

export default ErrorInformator;
