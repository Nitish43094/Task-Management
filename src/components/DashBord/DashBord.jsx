import React, { useEffect, useState } from "react";
import { Card } from "../../pages/Card";
import { CardContent } from "../../pages/CardContent";
import Button from "../../pages/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTaskbyUser } from '../../services/operations/taskApi';
import { getAllFeedbyUser } from "../../services/operations/feedApi";


const Dashboard = () => {
  const { userData, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  console.log("USer data is ", tasks)
  const [feed, setFeeds] = useState([]);
  // Feed Data
  useEffect(() => {
    const fetchFeeds = async () => {
      const fetchedFeeds = await dispatch(getAllFeedbyUser(token));
      setFeeds(fetchedFeeds.data);
    };
    fetchFeeds();
  }, []);
  // Task Data
  useEffect(() => {
    const fetchTask = async () => {
      const fetchedFeeds = await dispatch(getAllTaskbyUser(token));
      console.log("Get Task data is ",fetchedFeeds.data)
      setTasks(fetchedFeeds.data);
    };
    fetchTask();
  }, []);
  console.log(userData);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardContent>
            <div className="flex items-center space-x-4">
              <img
                src={userData.image}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold">{userData.name}</h2>
                <p className="text-sm text-gray-500">{userData.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">Task Board</h2>
            {
              tasks.length > 0 ?
                (
                  <div className="space-y-4">
                    {
                      tasks.map((item) => {
                        return (
                          <div className="flex items-center justify-between bg-white p-3 shadow rounded-lg" key={item._id}>
                            <div>
                              <h3 className="font-medium">{item.task}</h3>
                              <p className="text-sm text-gray-500">{item.description}</p>
                            </div>
                            <Button onClick={() => navigate("/task")} variant="outline">View</Button>
                          </div>
                        )
                      })
                    }
                  </div>
                )
                :
                (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-white p-3 shadow rounded-lg">
                      Task Bord is Empty
                    </div>
                  </div>
                )
            }

          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">Task Board</h2>
            {
              feed.length > 0 ?
                (
                  <div className="space-y-4">
                    {
                      feed.map((item) => {
                        return (
                          <div className="flex items-center justify-between bg-white p-3 shadow rounded-lg" key={item._id}>
                            <div>
                              <h3 className="font-medium">{item.title}</h3>
                              <img src={item.image} alt="img" className="text-sm text-gray-500 w-full h-20" />
                            </div>
                            <Button variant="outline">View</Button>
                          </div>
                        )
                      })
                    }
                  </div>
                )
                :
                (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-white p-3 shadow rounded-lg">
                      Task Bord is Empty
                    </div>
                  </div>
                )
            }

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
