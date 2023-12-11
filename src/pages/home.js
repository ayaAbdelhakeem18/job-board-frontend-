import React from 'react'
import Intro from '../components/intro'
import Search from '../components/search'
import Job_category from '../components/job_category'
import Marketing_sec from '../components/marketing_sec'
import FeaturedJobs from '../components/featuredJobs'
import Footer from '../components/footer'

function Home() {
  return (
    <div>
      <Intro content={true}/>
      <Search/>
      <Job_category/>
      <Marketing_sec/>
      <FeaturedJobs section={true}/>
    </div>
  )
}

export default Home
