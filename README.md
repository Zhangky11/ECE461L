# ECE461L

## How to Run the Website

1. Use your own MongoDB host (You can follow instructions on your MongoDB dashboard)

   ` /backend/config.py -- MONGODB_SETTINGS`

   You may encounter the error concerning "SSL error". Try to add your current IP address into whitelist on your MongoDB dashboard.

2. Run frontend and backend separately

   Some dependencies may need be solved.

## How to Send an Axios Request with JWT token

You can refer to ` UserProfilePage.jsx Line 12`

```jsx
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.post('http://127.0.0.1:5000/auth/return_user/', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data && response.data.username) {
          setUser(response.data.username);

          // response.data is the json includes user info
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [navigate]);
```

* Use  `  useEffect` Hook to send an Axios Request every time the page refreshes
* Fetch JWT token from LocalStorage and insert it into the request head

## Backend API 

1. Login( )

   * End Point: 127.0.0.1:5000/auth/login

   * Argument (The keys sent from the front-end to the back-end must exactly correspond with the expected keys on the server)

     * username
     * password

   * Return Value

     * jsonify({"access_token": access_token,'projects':user.associated_projects()})

       (If unsure, you could use 'console.log()' to print the return value)

2. Register( )

   
