import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState([]);
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setLoading(false);
    setInfo([
      json.data.movie.language,
      json.data.movie.rating,
      json.data.movie.runtime,
    ]);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      <h1>More Information</h1>
      <div>
        {loading ? (
          <h2>Loading ...</h2>
        ) : (
          <div>
            <li>language: {info[0]}</li>
            <li>Rating: {info[1]} / 10.0</li>
            <li>
              RunTime: {info[2]}min ({Math.floor(info[2] / 60)}H {info[2] % 60}
              M)
            </li>
          </div>
        )}
      </div>
    </div>
  );
}
export default Detail;
