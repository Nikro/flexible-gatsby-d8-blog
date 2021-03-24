import React from "react"
import Layout from "../components/layout"

export default ({}) => {
  return (
    <Layout>
      <section>
        <header className="main">
          <h1>Contact Me</h1>
        </header>
        <div>
          <form action={"https://getform.io/f/" + `${process.env.GETFORM_IO_URL}` } method="POST">
            <p>Feel free to contact me about anything - either a project, mentorship or just a friendship request.</p>
            <div className="row gtr-uniform">
              <div className="col-6 col-12-xsmall">
                <input type="text" name="name" placeholder="Name" required />
              </div>
              <div className="col-6 col-12-xsmall">
                <input type="email" name="email" placeholder="E-mail" required />
              </div>
              <div className="col-12">
                <textarea rows="6" name="message" placeholder="Your message..." required />
              </div>
              <div className="col-12">
                <button type="submit" className="primary">Send</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  )
}
