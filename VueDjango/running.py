from apscheduler.schedulers.blocking import BlockingScheduler

if __name__ == '__main__':
    executor = BlockingScheduler()
    executor.start()
