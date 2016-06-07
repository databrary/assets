library(ggplot2)
library(plyr)
library(dplyr)
library(scales)
library(lubridate)

dataset <- read.csv("/Users/guradisu/databrary-assets/figures/authOverTimeGraph/auth.csv",header=FALSE)
dataset <- dataset %>% group_by(V1) %>% mutate(people = sequence(n()))
#View(dataset)

dataset$V2 <- as.Date(dataset$V2)

ggplot(dataset, aes(x = V2, y = people)) + 
  geom_line(data=subset(dataset,V1=="EDIT"),color="#2FA38C",size=2) +
  geom_line(data=subset(dataset,V1=="ADMIN"),color="#EE9374",size=2) +
  scale_x_date(breaks = seq(as.Date("2013-06-01"), as.Date("2016-06-13"), by = "6 month"), labels = date_format("%b %Y")) +
  scale_y_continuous(expand = c(0, 0)) +
  expand_limits(y = 0) +
  theme(
    panel.background = element_blank(),
    panel.grid.minor = element_blank(),
    panel.grid.major.y = element_line(color="#cccccc",size=0.5),
    axis.line.x = element_line(color="#333333",size=0.75),
    axis.ticks.x = element_line(color="#333333",size=0.75),
    axis.ticks.y = element_blank(),
    axis.ticks.length = unit(.3, "cm"),
    axis.text.x = element_text(margin=margin(15,5,10,5,"pt")),
    text = element_text(size=26)
  ) +
  ylab("") +
  xlab("") +
  annotate("text", x=as.Date('2015-03-01'), y=200, label = "Authorized Investigators", color = "#2FA38C", size=9) + 
  annotate("text", x=as.Date('2016-03-01'), y=75, label = "Institutions", color="#EE9374", size=9)
  

