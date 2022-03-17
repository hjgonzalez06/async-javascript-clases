/* CONSTANTES PARA CONSULTA DE API */

const SPACEX_API_BASE_URL = 'https://api.spacexdata.com/v3'
const init = {
  method: 'GET',
  mode: 'cors'
}

window.onload = () => {

  /* OBTENCIÓN DE ELEMENTOS */

  const launches_btn = document.getElementById('launches-btn')
  const missions_btn = document.getElementById('missions-btn')
  const display_data = document.getElementById('display-data')
  
  /* SOLICITUDES */

  const getView = async view_name => {
    const view = await fetch(`views/${view_name}.html`)
    return view.text()
  }

  const getSpacexLaunchesData = async () => {
    const launches = await fetch(`${SPACEX_API_BASE_URL}/launches`, init)
    return launches.json()
  }

  const getSpacexMissionsData = async () => {
    const missions = await fetch(`${SPACEX_API_BASE_URL}/missions`, init)
    return missions.json()
  }

  /* EJECUCIÓN DE SOLICITUDES */

  getView('launches')
    .then(response => {
      display_data.innerHTML = response
      getSpacexLaunchesData()
        .then(data => {
          const launches = []
          data?.map(({ flight_number, mission_name, launch_year, rocket, launch_site }) => {
            const { rocket_name } = rocket
            const { site_name } = launch_site
            let launch = `<tr>
              <td>${flight_number}</td>
              <td>${mission_name}</td>
              <td>${launch_year}</td>
              <td>${rocket_name}</td>
              <td>${site_name}</td>
              <td><button class='info'>Ver más</button></td>
            <tr>`
            launches.push(launch)
          })
          document.getElementById('launches-info').innerHTML = launches.join('')
        })
        .catch(() => {
          alert('Existen problemas para consultar la SpaceX API')
        })
    })
    .catch(() => {
      alert('No existe la página solicitada')
    })

    launches_btn.addEventListener('click', () => {
      display_data.innerHTML = ''
      getView('launches')
        .then(response => {
          display_data.innerHTML = response
          getSpacexLaunchesData()
            .then(data => {
              const launches = []
              data?.map(({ flight_number, mission_name, launch_year, rocket, launch_site }) => {
                const { rocket_name } = rocket
                const { site_name } = launch_site
                let launch = `<tr>
                  <td>${flight_number}</td>
                  <td>${mission_name}</td>
                  <td>${launch_year}</td>
                  <td>${rocket_name}</td>
                  <td>${site_name}</td>
                  <td class='info'><button>Ver más</button></td>
                <tr>`
                launches.push(launch)
              })
              document.getElementById('launches-info').innerHTML = launches.join('')
            })
            .catch(() => {
              alert('Existen problemas para consultar la SpaceX API')
            })
        })
        .catch(() => {
          alert('No existe la página solicitada')
        })
    })

    missions_btn.addEventListener('click', () => {
      display_data.innerHTML = ''
      getView('missions')
        .then(response => {
          display_data.innerHTML = response
          getSpacexMissionsData()
            .then(data => {
              const missions = []
              data.map(({ mission_name, mission_id, website, description }) => {
                let mission = `<tr>
                  <td>${mission_id}</td>
                  <td>${mission_name}</td>
                  <td>${description}</td>
                  <td><a href=${website} target='_blank'>Visitar</a></td>
                <tr>`
                missions.push(mission)
              })
              document.getElementById('missions-info').innerHTML = missions.join('')
            })
            .catch(() => {
              alert('Existen problemas para consultar la SpaceX API')
            })
        })
        .catch(() => {
          alert('No existe la página solicitada')
        })
    })

  /* UTILS */

  const getFullYear = () => {
    const date = new Date()
    document.getElementById('full-year').innerHTML = date.getFullYear()
  }

  getFullYear()
}
