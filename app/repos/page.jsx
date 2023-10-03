import Link from 'next/link'
import { FaStar, FaCodeBranch, FaEye } from 'react-icons/fa'
import { github_user } from '@/const/const'

// const username = 'bradtraversy'
const username = github_user

async function fetchRepos() {
  const url = `https://api.github.com/users/${username}/repos`

  //1. SSG : static site generation
  // const reponse = await fetch(url)
  // 2. SSR : server side rendering
  // 3. ISR : incremental static regeneration

  //const response = await fetch(url, { cache: 'no-store' })
  const response = await fetch(url, { next: { revalidate: 60} })

  await new Promise((resolve) => setTimeout(resolve, 1000))

  const repos = await response.json()
  return repos
}

const ReposPage = async () => {
  const repos = await fetchRepos()
  //console.log(repos)
  return (
    <div>
      <h2>Github Repository of {username}</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id} className="bg-gray-100 m-4 p-4 rounded-md">
            <Link href={`/repos/${repo.name}`}>
              <h3 className="text-xl font-bold">{repo.name}</h3>
              <p>{repo.description}</p>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <FaStar /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <FaCodeBranch /> {repo.forks_count}
                </span>
                <span className="flex items-center gap-1">
                  <FaEye /> {repo.watchers_count}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ReposPage
