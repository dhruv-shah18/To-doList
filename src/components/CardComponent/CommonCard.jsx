import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";

const CommonCard = ({ data, title, subtitle, wantSparkLineChart = true }) => {
  return (
    <Card sx={{ maxWidth: 150 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="div">
            {title ? title : "User Tasks"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data?.length} {subtitle ? subtitle : "Users"}
          </Typography>

          {Array.isArray(data) && data?.length > 0 && wantSparkLineChart ? (
            <SparkLineChart
              data={data}
              width={50}
              height={50}
              showTooltip
              curve="linear" // optional
            />
          ) : (
            <Typography variant="body2" color="text.secondary">
              {wantSparkLineChart ? "No data available" : data}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CommonCard;
