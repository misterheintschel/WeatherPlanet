import {React , Component} from 'react';
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend} from 'recharts';

class Chart extends Component {

  loadData = (data) => {
    let hours = [];
    let values = [];
    for (const time in data) {
      let hour = new Date(data[time].dt * 1000)
      hours.push(hour.toLocaleTimeString([],{hour:'numeric',minute:'numeric'}))
      values.push(Math.round(data[time].temp))
    }
    let graphData = [];
    let min = 80;
    let max = 80;
    for (let i = 0; i <=23;i++){
      graphData.push(
        {
          "time":hours[i],
          "Temp":values[i]
        }
      );
      if (values[i] < min){
        min = values[i]
      }
      if (values[i] > max){
        max = values[i]
      }
    }
    return [graphData,min,max];
  }

	renderChart = () => {
    if (this.props.data === ''){
      return (
        <div>
        </div>
      );
    }
    else {
      let graph = this.loadData(this.props.data)
      const formatter = (value) => `${value}\u00B0`;
  		return (
        <div className="LineChart">
          <LineChart width={800} height={400} data={graph[0]}
              margin={{ top: 5, right: 40, left: -5, bottom: 10 }}>
            <XAxis stroke="black" dataKey="time" angle={-45} dy={20} interval={0}/>
            <YAxis tickFormatter={formatter} tickCount={15} type="number" domain={[(graph[1]-5),(graph[2]+5)]}
              stroke="black" dataKey="Temp"/>
            <Tooltip />
            <Legend width={100} wrapperStyle={{top: 10, left: 80, backgroundColor:'white', border: '1px solid white', borderRadius: 10, lineHeight: '40px', boxShadow:'1px 1px 5px 1px white, -1px -1px 5px 1px white' }}/>
            <Line type="monotone" dataKey="Temp" datakey="time" stroke="red"/>
          </LineChart>
        </div>
      )
	  }
  }

  render(){
    return (
      <>
        {this.renderChart()}
      </>
    )
  }

}
export default Chart;
