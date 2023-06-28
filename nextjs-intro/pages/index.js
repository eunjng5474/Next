import { useEffect, useState } from "react"
import Seo from "../components/Seo"
import Link from "next/link"
import { useRouter } from "next/router"

// async function fetchData() {
//   const res = await fetch('http://localhost:3000/api/movies', {
//     cache: 'no-store',
//   })
//   const { results } = await res.json()
//   return results
// }

export default function Home() {
  // const results = await fetchData()
  const router = useRouter()
  const onClick = (id, title) => {
    router.push(`/movies/${title}/${id}`)
  }
  const [movies, setMovies] = useState()
  useEffect(() => {
    (async () => {
      const { results } = await (
        await fetch(
          `http://localhost:3000/api/movies`
        // `https://api.themoviedb.org/3/movie/popular?language=ko-KR&api_key=${API_KEY}`
      )
      ).json()
        setMovies(results)
      })()  // 즉시 실행(IIFE)
    }, [])
  return (
    <div className="container">
      <Seo title="Home"/>
      {movies?.map((movie) => (
        <div onClick={() => onClick(movie.id, movie.original_title)}
        className="movie"
        key={movie.id}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
          <h4>
            <Link href={`/movies/${movie.original_title}/${movie.id}`} legacyBehavior>
              <a>{movie.original_title}</a>
            </Link>
          </h4>
        </div>
      ))}
    <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  )
}

// export async function getServerSideProps() {
//   // server에서만 실행되므로, client에게 보여지지 않음
  // // const [movies, setMovies] = useState([])
  // // useEffect(() => {
  // //   (async () => {
  // const { results } = await (
  //   await fetch(
  //     `http://localhost:3000/api/movies`
  //   // `https://api.themoviedb.org/3/movie/popular?language=ko-KR&api_key=${API_KEY}`
  // )
  // ).json()
  // //     setMovies(results)
  // //   })()  // 즉시 실행(IIFE)
  // // }, [])

//   return {
//     props: {
//       results,
//     }
//   }
// }