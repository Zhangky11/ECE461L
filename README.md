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

     * jsonify({"access_token": access_token,
                'projects':{{
                               'name' :project.name,
                               'description': project.description,
                               'id' :project.id_inc,
                               'member_list' : project.member_list,
            }}
       })
       (If unsure, you could use 'console.log()' to print the return value)

2. register( )
   
   * End Point: 127.0.0.1:5000/auth/register
     
   * Argument
          * username
          * password
          * confirmPassword
     
     *Return Value
        *1)jsonify({"message": "Invalid input"})
        *2)jsonify({"message": "Password doesn't match"})
        *3)jsonify({"message": "Username already exists"})
        *4)jsonify({"message": "User registered successfully"})

3.return_user()

   *End Point: 127.0.0.1:5000/auth/return_user/
   
   *Argument
     * JWT token
      
   *return value
         *jsonify({"username":user.username,
                  'projects':{{
                               'name' :project.name,
                               'description': project.description,
                               'id' :project.id_inc,
                               'member_list' : project.member_list,
            }}
            //list of projects
         })

4.display_proj()

   *End Point: 127.0.0.1:5000/api/project/display_proj
   
   *Argument
      *JWT token
      *project_id
      
   *return value
      *1)jsonify({"message": "Project doesn't exists"})
      *2) 
      *jsonify ({"project_id": project.id_inc, 
               'project_discription': project.description,
               "project_member_list": {} //list of users in  project
               "Hardware_list": {
                   'hw_name':hardware.hw_name,
                   'hw_amount': hardware.hw_amount,
                   'total_availability': hardware.hardware_from_pool.total_availability,
               }
            //list of JSON objects in the above format
      })

5.create_proj()

   *Endpoint = 127.0.0.1:5000/api/project/create_proj
   
   *Argument
     * JWT token
     * project_id
     * project_name
     * project_description
      
   *return value
      *1)  jsonify({"message": "User doesn't exists"})
      *2) jsonify({"message": "Project already exist"})
      *3) jsonify({"message": "Create project successfully"})

6. join_proj()
   
      *endpoint: 127.0.0.1:5000/api/project/join_proj
   
      *Argument
         *JWT token
         *project_id
   
      *Return value:
         *1) jsonify({"message": "User doesn't exists"})
         *2) jsonify({"message": "Project doesn't exists"})
         *3)jsonify({"message": "Join project successfully"})

7.delete_proj()

   *endpoint: 127.0.0.1:5000/api/project/delete_proj
   
   *Argument
      *JWT token
     * project_id
      
   *Return value:
      *1)jsonify({"message": "Project doesn't exists"})
      *2)jsonify({"message": "User isn't in the project"})
      *3)jsonify({"message": "Delete project successfully"})

8.leave_proj()

   *endpoint: 127.0.0.1:5000/api/project/leave_proj
   
   *Argument
      *JWT token
      *project_id
      
   *Return value:
      *1)jsonify({"message": "Project doesn't exists"})
      *2)jsonify({"message": "User doesn't exists"})
      *3)jsonify({"message": "Leave project successfully"})

9.request_hw()

   *endpoint: 127.0.0.1:5000/api/hardware/request_hw
   
   *Argument
      *JWT token
     * project_id
      *hw_name
      *amount
      
   *Return value
      *1)jsonify({"message": "Project doesn't exists"})
     * 2)jsonify({"message": "HW doesn't exists"})
      *3)jsonify({"message": "Not enough HW!"})
      *4)jsonify({"message": "Request Completed!"})

10.return_hw()

   *endpoint: 127.0.0.1:5000/api/hardware/return_hw
   
   *Argument
      *JWT token
      *project_id
     * hw_name
      *hw_amount
      
   *Return value
        *1)jsonify({"message": "Project doesn't exists"})    
        *2)jsonify({"message": "HW doesn't exists"})
        *3)jsonify({"message": "Incorrect return hardware amount!"})
        *4)jsonify({"message": "All the hardware from this HWset has been returned!"})
        *5)jsonify({"message": "This hardware hasn't been requested yet!"})
        *6)jsonify({"message": "Return Completed!"})
   
   
