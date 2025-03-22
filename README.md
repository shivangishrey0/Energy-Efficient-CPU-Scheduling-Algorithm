
# 📌 Energy-Efficient-CPU-Scheduling-Algorithm

This project implements multiple CPU scheduling algorithms with a focus on **reducing power consumption** without compromising performance. The web application provides **Gantt charts, turnaround time (TAT), waiting time (WT), and power consumption comparisons** for different scheduling methods.

---

## 🚀 Features  

- ✅ Supports multiple CPU scheduling algorithms:  
  - **First Come First Serve (FCFS)**  
  - **Shortest Job First (SJF) - Preemptive & Non-Preemptive**  
  - **Round Robin (RR) with Dynamic Time Quantum**  
  - **Priority Scheduling - Preemptive & Non-Preemptive**  
  - **Multi-Level Queue (MLQ) & Multi-Level Feedback Queue (MLFQ)**  

- ✅ Energy-efficient scheduling techniques  
- ✅ Dynamic **Gantt chart generation**  
- ✅ Calculates **Turnaround Time (TAT), Waiting Time (WT), and Response Time (RT)**  
- ✅ Power consumption analysis for **baseline vs optimized scheduling**  

---

## 🛠️ Tech Stack  

### **Frontend:**  
- React.js (for interactive UI)  
- Tailwind CSS (for styling)  
- Chart.js (for Gantt charts)  

### **Backend:**  
- Node.js + Express.js (for API)  
- MongoDB (for data storage)  
- TensorFlow.js (for AI-based energy optimization, if needed)  

---

## 📥 Installation & Setup  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/Muskanagrawal2005/cpu-energy-efficient-scheduling.git
cd cpu-energy-efficient-scheduling
```
## 🖥️ Installation
### **1️⃣ Install Dependencies**
```bash bashCopynpm install ```
### **2️⃣ Start the Backend Server**
```bash
bashCopycd backend 
node server.js
```
### **3️⃣ Start the Frontend**
```bash
bashCopycd frontend
npm start
```

### **🖥️ Usage Guide**

This project simulates different CPU scheduling algorithms and computes energy consumption based on the selected algorithm. It calculates turnaround time (TAT), waiting time (WT), response time (RT), and provides an energy savings calculation.

## Step 1: Select a Scheduling Algorithm

Choose one of the following scheduling algorithms:
- **FCFS (First-Come, First-Served)**
- **SJF (Shortest Job First)**
- **RR (Round Robin)**
- **Priority Scheduling**
- **MLQ (Multilevel Queue)**
- **MLFQ (Multilevel Feedback Queue)**

## Step 2: Input Process Data

You need to input the following details for each process:
- **Arrival Time**: The time when the process arrives in the system.
- **Burst Time**: The time the process requires on the CPU.
- **Priority**: Only applicable for **Priority**, **MLFQ**, and **MLQ** algorithms.
- **Time Quantum**: Only used for **Round Robin** scheduling (time slice each process gets).

## Step 3: Compute Scheduling

Once the process data is entered, the system computes:
- **Turnaround Time (TAT)**: The total time taken from the arrival of the process to its completion.
- **Waiting Time (WT)**: The total time the process spends waiting in the ready queue.
- **Response Time (RT)**: The time between the submission of a request and the first response.
- A **Gantt Chart** displaying the execution order of processes and time slices.

## Step 4: View Energy Consumption

The system calculates power consumption based on CPU frequency scaling:

### Baseline Power Consumption:

P<sub>baseline</sub>= C * V<sup>2</sup> * f<sub>max</sub>

Where:
-  C = Capacitance (fixed),
-  V = Voltage (depends on frequency),
- f<sub>max</sub> = Maximum CPU frequency.

### Optimized Power Consumption (with Dynamic Voltage & Frequency Scaling):

P<sub>new</sub> = C * V<sup>2</sup> * f<sub>opt</sub>

Where f_opt and V_opt are chosen based on scheduling optimizations.

### Power Savings Calculation:

Power Savings =(P<sub>baseline</sub> - P<sub>new</sub>) * 100 / P<sub>baseline</sub>


---

## **Future Enhancements**
- **AI-based Scheduling**: Implement AI to predict the most energy-efficient scheduling strategies.
- **Real-Time Process Execution Simulation**: Add support for real-time process execution simulation.
- **Multi-Core CPU Scheduling**: Extend scheduling to support multi-core CPUs.

---

## **Contributing**
Want to contribute? Fork the repository, create a new branch, and submit a Pull Request 🚀

---

## **Author**
Muskan Agrawal

**GitHub**: Muskanagrawal2005

This should work well in a **README.md** file. Let me know if you need any further modifications or additional details!
