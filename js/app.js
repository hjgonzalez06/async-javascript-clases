/* CONSTANTES PARA CONSULTA DE API */

const SPACEX_API_BASE_URL = 'https://api.spacexdata.com/v3'
const init = {
  method: 'GET',
  mode: 'cors'
}

window.onload = () => {

  /* OBTENCIÓN DE ELEMENTOS */

  const spacex_logo = document.getElementById('spacex-logo')
  const launches_btn = document.getElementById('launches-btn')
  const missions_btn = document.getElementById('missions-btn')
  const rockets_btn = document.getElementById('rockets-btn')
  const display_data = document.getElementById('display-data')

  /* SOLICITUDES */

  const getLogo = async () => {
    const logo = await fetch('assets/logos/SpaceX-Logo.png')
    return await logo.blob()
  }

  const getView = async view_name => {
    const view = await fetch(`views/${view_name}.html`)
    console.log(view)
    return view.text()
  }

  const getSpacexLaunchesData = async () => {
    const launches = await fetch(`${SPACEX_API_BASE_URL}/launches`, init)
    return launches.json()
  }

  /* EJECUCIÓN DE SOLICITUDES */

  getLogo()
    .then(response => {
      spacex_logo.src = URL.createObjectURL(response)
    })

  getView('launches')
    .then(response => {
      display_data.innerHTML = response
      getSpacexLaunchesData()
        .then(data => {
            const launches = []
            data.map(({ flight_number, mission_name, launch_year, rocket, launch_site }) => {
              const { rocket_name } = rocket
              const { site_name } = launch_site
              let launch = `<tr>
                <td>${flight_number}</td>
                <td>${mission_name}</td>
                <td>${launch_year}</td>
                <td>${rocket_name}</td>
                <td>${site_name}</td>
                <td class='info'><button>Ver más</button></td>
              </tr>`
              launches.push(launch)
            })
            document.getElementById('launches-info').innerHTML = launches.join('')
          }
        )
        .catch(error => {
            alert(`La consulta ha fallado: ${error}`)
          }
        )
    })

  launches_btn.addEventListener('click', () => {
    getView('launches')
      .then(response => {
        display_data.innerHTML = response
        getSpacexLaunchesData()
          .then(data => {
              const launches = []
              data.map(({ flight_number, mission_name, launch_year, rocket, launch_site }) => {
                const { rocket_name } = rocket
                const { site_name } = launch_site
                let launch = `<tr>
                  <td>${flight_number}</td>
                  <td>${mission_name}</td>
                  <td>${launch_year}</td>
                  <td>${rocket_name}</td>
                  <td>${site_name}</td>
                  <td class='info'><button>Ver más</button></td>
                </tr>`
                launches.push(launch)
              })
              document.getElementById('launches-info').innerHTML = launches.join('')
            }
          )
          .catch(error => {
              alert(`La consulta ha fallado: ${error}`)
            }
          )
      })
    }
  )

  missions_btn.addEventListener('click', () => document.getElementById('display-data').innerHTML = '')

  /* UTILS */

  const getFullYear = () => {
    const date = new Date()
    document.getElementById('full-year').innerHTML = date.getFullYear()
  }

  getFullYear()
}
