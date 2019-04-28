package GA;

public class GA {
    public static String createRubbishTxt(){
        FitnessCalc.setSolution(true);      // this means we want our solution to be palindromic

        // Create an initial population
        Population myPop = new Population(50, true);

        // Evolve our population until we reach an optimum solution
        int generationCount = 0;
        while (myPop.getFittest().getFitness() < FitnessCalc.getMaxFitness()) {
            generationCount++;
//            System.out.println("Generation: " + generationCount + " Fittest: " + myPop.getFittest().getFitness());
//            System.out.println("Current Fittest: " + myPop.getFittest());
            myPop = Algorithm.evolvePopulation(myPop);
        }
        return myPop.getFittest().toString();
    }
}
