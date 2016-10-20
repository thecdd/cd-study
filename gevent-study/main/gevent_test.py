import gevent
from gevent import Greenlet
from gevent.event import Event


class DemoOne:
    @staticmethod
    def run():
        def foo(message, n):
            """
            Each thread will be passed the message, and n arguments
            in its initialization.
            """
            gevent.sleep(n)
            print(message)

        # Initialize a new Greenlet instance running the named function
        # foo
        thread1 = Greenlet.spawn(foo, "Hello", 3)

        # Wrapper for creating and running a new Greenlet from the named
        # function foo, with the passed arguments
        thread2 = gevent.spawn(foo, "I live!", 2)

        # Lambda expressions
        thread3 = gevent.spawn(lambda x: (x + 1), 2)

        threads = [thread1, thread2, thread3]

        # Block until all threads complete.
        gevent.joinall(threads)


class DemoTwo:
    @staticmethod
    def run():
        def gen(max):
            n = 0
            while n < max:
                print('start', n)
                a = yield n
                print(a)
                print('end', n)
                n += 1

        my_numbers = gen(10)
        my_numbers.__next__()
        my_numbers.send('test')
        my_numbers.__next__()


class DemoThree:
    @staticmethod
    def run():
        evt = Event()

        def setter():
            '''After 3 seconds, wake all threads waiting on the value of evt'''
            print('A: Hey wait for me, I have to do something')
            gevent.sleep(3)
            print("Ok, I'm done")
            evt.set()

        def waiter():
            '''After 3 seconds the get call will unblock'''
            print("I'll wait for you")
            evt.wait()  # blocking
            print("It's about time")

        def main():
            gevent.joinall([
                gevent.spawn(setter),
                gevent.spawn(waiter),
                gevent.spawn(waiter),
                gevent.spawn(waiter),
                gevent.spawn(waiter),
                gevent.spawn(waiter)
            ])

        main()


# DemoOne.run()
DemoThree.run()
