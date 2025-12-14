interface ResultRow {
  line: string;
  destination: string;
  departureTime: number;
}

export const ResultRow: React.FC<ResultRow> = ({
  line,
  destination,
  departureTime,
}) => {
  return (
    <tr className="w-full flex border-b border-b-gray-300 dark:border-b-gray-700 last:border-none py-4 text-gray-500 dark:text-gray-400 font-light">
      <td className="w-1/3 pr-4">{line}</td>
      <td className="w-1/3 px-4">{destination}</td>
      <td className="w-1/3 pl-4 text-right">
        {new Date(departureTime * 1000).toLocaleTimeString().substring(0, 5)}
      </td>
    </tr>
  );
};
